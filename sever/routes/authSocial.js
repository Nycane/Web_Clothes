var passport = require("passport");
const router = require("express").Router();
const authSocialController = require("../controllers/authSocialController");
const url = process.env.NODE_ENV === "development" ? process.env.CLIENT_URL : process.env.PRODUCTION_URL
console.log("url",url)
// Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"],prompt: 'select_account'})
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect:`${url}/login`,session:false}),
  async function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${url}/loginSocial/`+ req?.user?.id+"&"+req?.user?.code);
  }
);

// FaceBook
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope : ['email']}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${url}/login`,session:false}),
  async function(req, res) {
    try {
      // console.log("req user>>",req.user)
      // Successful authentication, redirect home.
      res.redirect(`${url}/loginSocial/` + req?.user?.id+"&"+req?.user?.code);
    } catch (error) {
      console.log(error)
    }
  });
router.post("/loginSocial", authSocialController.loginSuccess);
module.exports = router;
