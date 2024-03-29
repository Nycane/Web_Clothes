const { v4: uuidv4 } = require("uuid");
const authService = require("./authService");
const productService = require("./productService");
const handleResponse = require("../utils/handleResponse");
const sendMail = require("../configs/nodemailer");
const pool = require("../db");
const cloudinary = require("../configs/cloudinary");
const constant = require("../constant");
class userService {
  // LOGIN
  async login(email, password, res) {
    try {
      const user = await this.selectUserByEmail(email);
      if (user.length > 0) {
        // check password
        const isMatch = await authService.comparePasswords(
          password,
          user[0].password
        );
        if (!isMatch)
          return handleResponse.createResponse(401, "Incorrect password");
        // Check refreshToken exist
        const checkRefreshToken = await authService.selectRefreshTokenById(
          user[0].id
        );
        if (checkRefreshToken.length > 0) {
          await authService.deleteRefreshToken(checkRefreshToken[0].user_id);
        }
        // create token
        const accessToken = authService.generateAccessToken(user[0]);
        const refreshToken = authService.generateRefreshToken(user[0]);
        // save refreshToken in cookies
        authService.saveDataInCookie(res, "refreshToken", refreshToken);
        // insert token to db
        await authService.insertRefreshToken(user[0].id, refreshToken);
        const data = { id: user[0].id, accessToken };
        return handleResponse.createResponse(200, "Login Success", data);
      } else {
        return handleResponse.createResponse(401, "Incorrect account");
      }
    } catch (error) {
      throw error;
    }
  }

  // REGISTER
  async register(data) {
    try {
      const hashPassword = await authService.hashPassword(data.password);
      const userId = this.generateUserId();
      const user = {
        userId,
        ...data,
        role: 2,
        hashPassword,
        avatarDefault:
          "https://res.cloudinary.com/djdsp9etg/image/upload/v1701920476/avatar/360_F_208980504_njS12KTuZLQ3wQZaHLbKpSLFNu9rF6Hs_fzii9l.jpg",
      };
      // check user
      const checkUser = await this.selectUserByEmail(user.email);
      if (checkUser.length > 0) {
        return handleResponse.createResponse(400, "Email already exist");
      }
      await this.insertUser(user);
      return handleResponse.createResponse(200, "Register success");
    } catch (error) {
      throw error;
    }
  }
  // LOGOUT
  async logOut(res, id) {
    try {
      if (id) await authService.deleteRefreshToken(id);
      authService.clearDataFromCookie(res, "refreshToken");
      return handleResponse.createResponse(200, "Logout Success");
    } catch (error) {
      throw error;
    }
  }
  // DELETE COMMENT
  // ----------------------------------------------------------------
  async deleteComment(commentId) {
    try {
      await this.deleteCommentByUser(commentId);
      return handleResponse.createResponse(200, "Delete success");
    } catch (error) {
      throw error;
    }
  }
  // CREATE COMMENT
  async createComment(productId, userId, rating, content) {
    try {
      await this.insertComment(productId, userId, rating, content);
      return handleResponse.createResponse(200, "Comment Success");
    } catch (error) {
      throw error;
    }
  }
  // GET COMMENT
  async getComment(productId) {
    try {
      const listComments = await this.selectListComment(productId);
      const countFeedbackProduct = await this.selectFeedbackCount(productId);
      const data = {
        listComments,
        countFeedbackProduct: countFeedbackProduct[0],
      };
      return handleResponse.createResponse(200, "success", data);
    } catch (error) {
      throw error;
    }
  }

  async getUserInfo(userId) {
    try {
      const user = await this.selectUserById(userId);
      const data = {
        userName: user[0].userName,
        email: user[0].email,
        address: user[0].address,
        phone: user[0].phone,
        avatar: user[0].avatar,
        type_log: user[0].type_log,
      };
      return handleResponse.createResponse(200, "Success", data);
    } catch (error) {
      throw error;
    }
  }

  async removeWishlist(productId, userId) {
    try {
      await this.deleteWishlistItem(productId, userId);
      return handleResponse.createResponse(200, "Remove Product Success");
    } catch (error) {
      throw error;
    }
  }

  // RESET PASSWORD
  async resetPassword(password, email) {
    try {
      const hashPassword = await authService.hashPassword(password);
      await this.updateForegetPassword(email, hashPassword);
      await this.deleteOtp(email);
      return handleResponse.createResponse(200, "Change Password Success");
    } catch (error) {
      throw error;
    }
  }
  // VERIFY OTP
  async verifyOtp(codeOtp) {
    try {
      const checkOtp = await this.selectOtpByCode(codeOtp);
      if (!(checkOtp.length > 0))
        return handleResponse.createResponse(400, "Otp code is incorrect");
      if (!(checkOtp[0].expired_time > Date.now()))
        return handleResponse.createResponse(
          400,
          "Otp has expired, please get a new otp"
        );
      return handleResponse.createResponse(200, "Otp is valid");
    } catch (error) {
      throw error;
    }
  }
  async forgetPassWord(email) {
    try {
      const user = await this.selectUserByEmail(email);
      if (!(user.length > 0))
        return handleResponse.createResponse(404, "Email does not exist");
      // kiểm tra otp có tồn tại chưa
      const checkOtp = await this.selectOtpByEmail(email);
      if (checkOtp.length > 0) {
        var verify_expried_time = checkOtp[0].expired_time > Date.now();
        if (verify_expried_time) {
          return handleResponse.createResponse(
            200,
            "Code has been sent to your email. Please check your email and use the code before requesting a new one.",
            { email: checkOtp[0].email }
          );
        }
      }
      // Goị hàm gửi mail
      let result = await sendMail(email);
      if (result.message === "Send Mail Success") {
        const otp_expiration_time = Date.now() + 5 * 60 * 1000;
        if (checkOtp.length > 0) {
          await this.updateOtp(
            result.codeOtp,
            otp_expiration_time,
            result.email
          );
        } else {
          await this.insertOtp(
            result.codeOtp,
            otp_expiration_time,
            result.email
          );
          // authService.saveRefreshTokenInCookie("emailVerifyOtp",res.email)
        }
        return handleResponse.createResponse(
          200,
          "The system has sent the code to your email",
          { email: result.email }
        );
      }
    } catch (error) {
      throw error;
    }
  }
  // UPDATE USER
  async updateUser(userName, phone, address, email, id, avatar) {
    try {
      let result = await cloudinary.uploadImage(avatar, id);
      await this.updateUserInfo(
        userName,
        phone,
        address,
        email,
        result.url,
        id
      );
      const user = await this.selectUserById(id);
      return handleResponse.createResponse(200, "Update Success", user[0]);
    } catch (error) {
      throw error;
    }
  }
  // CHANGE PASSWORD
  async changePassword(currentPw, newPw, id) {
    try {
      const user = await this.selectUserById(id);
      if (user.length > 0) {
        // check password
        const match = await authService.comparePasswords(
          currentPw,
          user[0].password
        );
        if (!match)
          return handleResponse.createResponse(401, "Password incorrect");
        // hash password
        const hashPassword = await authService.hashPassword(newPw);
        await this.updatePassword(hashPassword, user[0].id);
        return handleResponse.createResponse(200, "Change Password Success");
      }
      return handleResponse.createResponse(404, "Something went wrong");
    } catch (error) {
      throw error;
    }
  }
  // GET WISHLIST
  async getWishlist(userId) {
    try {
      const product = await this.selectWishlistProduct(userId);
      const productVariants = await productService.selectProductVariants(
        product
      );
      return handleResponse.createResponse(200, "Success", productVariants);
    } catch (error) {
      throw error;
    }
  }
  // ADD WISHLIST
  async addWishlist(productId, userId) {
    try {
      const checkProduct = await this.checkProductWishlist(productId, userId);
      // Nếu sản phẩm đã tồn tại thì không thêm nữa
      if (!checkProduct.length > 0)
        await this.insertWishlist(userId, productId);
      // Nếu chưa có thì thêm vào db
      return handleResponse.createResponse(200, "Add Wishlist Success");
    } catch (error) {
      throw error;
    }
  }
  // ADD CONTACT
  async addContact(name, email, phone, message) {
    try {
      await pool.query(
        "insert into contact(name,email,phone,message) values(?,?,?,?)",
        [name, email, phone, message]
      );
      return handleResponse.createResponse(200, "Success");
    } catch (error) {
      throw error;
    }
  }
  // ----------------------------------------------------------Excute---------------------------------------------------------------
  // INSERT COMMENT USER
  async insertComment(productId, userId, rating, content) {
    await pool.query(
      "insert into comments(product_id,user_id,rating,content)values(?,?,?,?)",
      [productId, userId, rating, content]
    );
  }
  // INSERT USER
  async insertUser(user) {
    await pool.query(
      "INSERT INTO users (id,id_role,username,password,email,phone,address,avatar,type_log) values (?,?,?,?,?,?,?,?,?)",
      [
        user.userId,
        user.role,
        user.fullname,
        user.hashPassword,
        user.email,
        user.phone,
        user.address,
        user.avatarDefault,
        "LOCAL",
      ]
    );
  }
  //INSERT WISHLIST
  async insertWishlist(userId, productId) {
    await pool.query("insert into wishlist(user_id,product_id)values(?,?)", [
      userId,
      productId,
    ]);
  }
  // INSERT OTP
  async insertOtp(codeOtp, expiredTime, email) {
    await pool.query("insert into otp(email,code,expired_time)values(?,?,?)", [
      email,
      codeOtp,
      expiredTime,
    ]);
  }
  // SELECT LIST COMMENTS
  async selectListComment(productId) {
    const [listComments] = await pool.query(
      "SELECT comments.id,comments.content,comments.rating,users.username,users.id as userId,users.avatar,comments.create_at from users,products,comments where users.id=comments.user_id and comments.product_id = products.id AND comments.product_id = ?",
      [productId]
    );
    return listComments;
  }

  // SELECT FEEDBACK COUNT
  async selectFeedbackCount(productId) {
    const [countFeedbackProduct] = await pool.query(
      "SELECT count(comments.id) as countReView, sum(comments.rating) as totalRating from users,products,comments where users.id=comments.user_id and comments.product_id = products.id AND comments.product_id = ?",
      [productId]
    );
    return countFeedbackProduct;
  }

  // SELECT USER BY ID
  async selectUserById(id) {
    const [user] = await pool.query("select * from users where id = ?", [id]);
    return user;
  }
  // SELECT USER BY EMAIL
  async selectUserByEmail(email, type = "LOCAL") {
    const [user] = await pool.query(
      "select * from users where email = ? and type_log = ?",
      [email, type]
    );
    return user;
  }

  // SELECT ALL USER
  async selectAllUser() {
    const [users] = await pool.query("select * from users");
    return users;
  }

  // SELECT VERIFY CODE
  async selectOtpByCode(codeOtp) {
    const [otp] = await pool.query("select * from otp where code = ?", [
      codeOtp,
    ]);
    return otp;
  }

  // CHECK OTP
  async selectOtpByEmail(email) {
    const [checkOtp] = await pool.query("select * from otp where email = ?", [
      email,
    ]);
    return checkOtp;
  }
  // SELECT COMMENT BY ID
  async selectCommentById(commentId) {
    const [comment] = await pool.query("select * from comments where id = ?", [
      commentId,
    ]);
    return comment;
  }
  // DELETE COMMENT USER
  async deleteCommentByUser(commentId) {
    await pool.query("Delete from comments where id = ?", [commentId]);
  }
  async deleteOtp(email) {
    await pool.query("Delete from otp where email = ?", [email]);
  }
  // DELETE WISHLIST
  async deleteWishlistItem(productId, userId) {
    await pool.query(
      "DELETE FROM wishlist WHERE product_id= ?  AND user_id= ?;",
      [productId, userId]
    );
  }
  // UPDATA AVATAR
  async updateAvatar(url, email) {
    await pool.query("update users set avatar = ? where email = ?", [
      url,
      email,
    ]);
  }
  // UPDATE OTP
  async updateOtp(codeOtp, expiredTime, email) {
    await pool.query(
      "update otp set code= ? , expired_time = ? where email= ?",
      [codeOtp, expiredTime, email]
    );
  }
  // UPDATE USER INFO
  async updateUserInfo(userName, phone, address, email, avatar, id) {
    await pool.query(
      "UPDATE users SET username = ? , phone = ? , address = ? , email = ? , avatar = ? WHERE id = ?",
      [userName, phone, address, email, avatar, id]
    );
  }
  // SELECT WISHLIST PRODUCT
  async selectWishlistProduct(userId) {
    const [products] = await pool.query(
      `select products.id,products.name,products.image,IF(products.price_discount > 0, products.price_discount, price) as price,products.created_at from wishlist,products where wishlist.product_id = products.id and wishlist.user_id= ?`,
      [userId]
    );
    return products;
  }

  //CHECK PRODUCT WISHLIST ALREADY EXIST
  async checkProductWishlist(productId, userId) {
    const [checkProduct] = await pool.query(
      "select * from wishlist where product_id = ? and user_id = ?",
      [productId, userId]
    );
    return checkProduct;
  }
  // UPDATE FORGET PASSWORD
  async updateForegetPassword(email, hashPassword) {
    await pool.query(
      "update users set password = ? where email = ? and type_log = ?",
      [hashPassword, email, constant.TYPE_LOG_LOCAL]
    );
  }
  // UPDATE PASSWORD
  async updatePassword(hashPassword, id) {
    await pool.query("update users set password = ? where id = ?", [
      hashPassword,
      id,
    ]);
  }
  // GERENATE USER ID
  generateUserId() {
    return uuidv4();
  }
}
module.exports = new userService();
