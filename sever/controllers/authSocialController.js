const handleResponse = require("../utils/handleResponse");
const authService = require("../service/authService");
const authSocialService = require("../service/authSocialService");
const userService = require("../service/userService");
const { v4: uuidv4 } = require("uuid");
class authSocial {
  async loginSuccess(req, res) {
    try {
      const id = req.body.id;
      const verifyCode = req.body.verifycationCode;
      // Check code , verify user
      const checkVerifyCationCode = await authSocialService.selectUserByCode(verifyCode);
      if (checkVerifyCationCode.length === 0) return handleResponse.sendError(res, 401, "You not have access");

      // Update verification_code new
      const newCode = uuidv4();
      await authSocialService.updateCode(newCode, id);

      // Get profile user
      const user = await userService.selectUserById(id);
      
      //   Token
      const accessToken = authService.generateAccessToken(user[0]);

      //   Refresh Token
      const refreshToken = authService.generateRefreshToken(user[0]);
      // Save refreshToken in cookie
      authService.saveDataInCookie(res,"refreshToken",refreshToken)
      //Check token
      const checkToken = await authService.selectRefreshTokenById(user[0].id);
      if (checkToken.length > 0) await authService.deleteRefreshToken(user[0].id);
      await authService.insertRefreshToken(user[0].id, refreshToken);
      const newData = { id: user[0].id, accessToken };
      return handleResponse.sendSuccess(res, "Logged in successfully", newData);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
}
module.exports = new authSocial();
