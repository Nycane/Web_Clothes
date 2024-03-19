const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");
const constant = require("../constant");
const handleResponse = require("../utils/handleResponse");
class authService {
  generateAccessToken(user) {
    const accessToken = jwt.sign(
      { id: user.id, userName: user.userName },
      process.env.JWT_SERECT,
      { expiresIn: constant.TOKEN_EXPIRATION_TIME }
    );
    return accessToken;
  }

  generateRefreshToken(user) {
    const refreshToken = jwt.sign(
      { id: user.id, userName: user.userName },
      process.env.JWT_SERECT_REFRESH,
      { expiresIn: constant.REFRESH_TOKEN_EXPIRATION_TIME }
    );
    return refreshToken;
  }

  insertRefreshToken = async (userId, token) => {
    await pool.query(
      "INSERT INTO refresh_token (user_id, token) VALUES (?,?)",
      [userId, token]
    );
  };

  deleteRefreshToken = async (userId) => {
    await pool.query("DELETE FROM refresh_token WHERE user_id = ?", [userId]);
  };

  updateRefreshToken = async (newRefreshToken, userId) => {
    await pool.query("update refresh_token set token = ? where user_id=?", [
      newRefreshToken,
      userId,
    ]);
  };

  selectRefreshToken = async (token) => {
    const [refreshToken] = await pool.query(
      "select * from refresh_token where token = ?",
      [token]
    );
    return refreshToken;
  };

  selectRefreshTokenById = async (userId) => {
    const [refreshToken] = await pool.query(
      "select * from refresh_token where user_id = ?",
      [userId]
    );
    return refreshToken;
  };

  refreshToken = async (req, res) => {
    try {
      const token = this.getDataFromCookie(req, "refreshToken");
      const checkRefreshToken = await this.selectRefreshToken(token);
      if (!(checkRefreshToken.length > 0))
        return handleResponse.createResponse(401, "You're Not Authenticated");

      // check token
      const decodeToken = jwt.verify(
        checkRefreshToken[0].token,
        process.env.JWT_SERECT_REFRESH
      );

      // check token expires time
      if (decodeToken.exp < Date.now() / 1000)
        return handleResponse.createResponse(401, "RefreshToken Expries");

      // generate token
      const accessToken = this.generateAccessToken(decodeToken);
      const refreshToken = this.generateRefreshToken(decodeToken);

      // save refreshToken in cookie
      this.saveDataInCookie(res, "refreshToken", refreshToken);
      await this.updateRefreshToken(refreshToken, decodeToken.id);
      return handleResponse.createResponse(200, "success", { accessToken });
    } catch (error) {
      throw error;
    }
  };

  comparePasswords = async (regularPassword, hashedPassword) => {
    const match = await bcrypt.compare(regularPassword, hashedPassword);
    return match;
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  };

  saveDataInCookie(res, key, value) {
    if (value) {
      res.cookie(key, value, {
        httpOnly: true,
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: false,
        samSite: "None",
      });
    } else {
      console.error("Invalid data");
    }
  }

  getDataFromCookie(req, key) {
    return req.cookies[key];
  }

  clearDataFromCookie(res, key) {
    res.clearCookie(key);
  }
}
module.exports = new authService();
