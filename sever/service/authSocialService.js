const pool = require("../db");
const constant = require("../constant");
class authSocialService {
  async selectUserByCode(code) {
    const [user] = await pool.query("select * from users where verifycation_code = ?", [code]);
    return user;
  }
  async updateCode(newCode, id) {
    await pool.query("update users set verifycation_code = ? where id = ?", [newCode,id]);
  }
  async insertUserSocial(id, role, displayName, email, photo, typeLog, code) {
    await pool.query(
      "insert into users(id,id_role,username,email,avatar,type_log,verifycation_code) values(?,?,?,?,?,?)",
      [id, role, displayName, email, photo, typeLog, code]
    );
  }
}
module.exports = new authSocialService();
