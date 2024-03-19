const userService = require("../service/userService");
const handleResponse = require("../utils/handleResponse");
require("dotenv");
const authService = require("../service/authService");
class userController {
  // REGISTER
  async register(req, res) {
    try {
      const result = await userService.register(req.body);
      if (result.status !== 200)
        return handleResponse.sendError(res,result.status,result.message);
      else
        return handleResponse.sendSuccess(res,result.data, result.message);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  // LOGIN
  async login(req,res) {
    try {
      const result = await userService.login(req.body.email,req.body.password,res);
      if (result.status !== 200)
        return handleResponse.sendError(res,result.status, result.message);
      else
        return handleResponse.sendSuccess(res,result.message,result.data );
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  // REFRESH TOKEN
  async RefreshToken(req, res) {
    try {
      const result = await authService.refreshToken(req,res);
    if (result.status !== 200)
       return handleResponse.sendError(res,result.status,result.message);
    else 
        return handleResponse.sendSuccess(res,result.message,result.data);
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res)
    }
  }

  // LOGOUT
  async logout(req, res) {
    try {
      const id = req.params.id;
      const result =  await userService.logOut(res,id);
      return handleResponse.sendSuccess(res,result.message);
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res);
    }
  }
  // CHANGE PASSWORD
  async changePassword(req, res) {
    const {currentPw,newPw,id} = req.body
    try {
      const result = await userService.changePassword(currentPw,newPw,id);
      if(result.status!=200) 
        return handleResponse.sendError(res,result.status,result.message)
      else
        return handleResponse.sendSuccess(res,result.message)
    } catch (error) {
      console.log(error)
        return handleResponse.sendError(res)
    }
  }
  // UPDATE USER
  async updateUser(req, res) {
      const { userName, phone, address, email, id, avatar } = req.body;
    try {
      const result = await userService.updateUser(userName,phone,address,email,id,avatar)
    if(result.status!==200)
      return handleResponse.sendError(res,result.status,result.message)
    else
      return handleResponse.sendSuccess(res,result.message,result.data)
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res)
    }
  }

  // COMMENT USER
  async createCommentUser(req, res) {
    try {
      const { productId, id: userId, rating, content } = req.body;
      const result =  await userService.createComment(productId,userId,rating,content);
      return handleResponse.sendSuccess(res,result.message);
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res)
    }
  }

  // GET COMMENT USER
  async getCommentUser(req, res) {
    try {
      const result = await userService.getComment(req.params.id);
      return handleResponse.sendSuccess(res,result.message,result.data);
    } catch (error) {
      return handleResponse.sendError(res);
    }
  }
  // DELETE COMMENT
  async deleteCommentUser(req, res) {
    try {
     const result =  await userService.deleteComment(req.params.id);
     if (result.status!=200) 
      return handleResponse.sendError(res,result.status,result.message)
    else
      return handleResponse.sendSuccess(res,result.message);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // FORGET PASSWORD
  async forgetPassword(req, res) {
    try {
      const result = await userService.forgetPassWord(req.body.email);
      if(result.status!==200)
        return handleResponse.sendError(res,result.status,result.message)
      else
        return handleResponse.sendSuccess(res,result.message,result.data)
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res)
    }
  }

  // VERIFY OTP
  async verifyOtp(req, res) {
    try {
      const codeOtp = req.body.otp;
      const result=await userService.verifyOtp(codeOtp)
      if(result.status!=200) 
        return handleResponse.sendError(res,result.status,result.message)
      else
        return handleResponse.sendSuccess(res,result.message)
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res);
    }
  }

  // RESET PASSWORD
  async resetPassword(req, res) {
      try {
      const { password,email} = req.body;
      const result = await userService.resetPassword(password,email)
      return handleResponse.sendSuccess(res,result.message)
      } catch (error) {
        console.log(error)
        return handleResponse.sendError(res)
      }
  }
// UPDATE AVATAR
  async updateAvatar(req, res) {
    try {
      const { image, email } = req.body;
     const resultUpdateAvt =  await userService.changeAvatar(image,email)
      return handleResponse.sendSuccess(res,resultUpdateAvt.message)
    } catch (error) {
      console.error("error", error);
      return handleResponse.sendError(res)
    }
  }
  // ADD WISHLIST
  async addWishList(req, res) {
    try {
      const { productId, userId } = req.body;
        const result = await userService.addWishlist(productId,userId)
        return handleResponse.sendSuccess(res,result.message)
    } catch (error) {
      console.log(error)
        return handleResponse.sendError(res)
    }
  }
  // GET WISHLIST
  async getWishList(req, res) {
    console.log("wishlist",req.body)
    try {
      const { userId } = req.body;
      const result = await userService.getWishlist(userId)
      return handleResponse.sendSuccess(res,result.message,result.data)
    } catch (error) {
      return handleResponse.sendError(res)
    }
  }

  // REMOVE WISHLIST
  async removeWishList(req, res) {
    try {
      const { productId, userId } = req.body;
      const result = await userService.removeWishlist(productId,userId);
      return handleResponse.sendSuccess(res,result.message)
    } catch (error) {
     return handleResponse.sendError(res)
    }
   
  }

  // GET USER INFO
  async getUserInfo(req, res) {
    try {
      const result = await userService.getUserInfo(req.params.id);
      return  handleResponse.sendSuccess(res,result.message,result.data)
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res)
    }
  }
  // GET IN TOUCH
  async addContact(req, res) {
    const {name,email,phone,message} = req.body;
    try {
      const result = await userService.addContact(name,email,phone,message);
      return  handleResponse.sendSuccess(res,result.message)
    } catch (error) {
      console.log(error)
      return handleResponse.sendError(res)
    }
  }
}

module.exports = new userController();
