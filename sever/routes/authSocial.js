var passport = require("passport");
const router = require("express").Router();
const authSocialController = require("../controllers/authSocialController");

// Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"],prompt: 'select_account'})
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login",session:false}),
  async function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/loginSocial/" + req?.user?.id+"&"+req?.user?.code);

  }
);

// FaceBook
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope : ['email']}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login',session:false}),
  async function(req, res) {
    try {
      // console.log("req user>>",req.user)
      // Successful authentication, redirect home.
      res.redirect("http://localhost:3000/loginSocial/" + req?.user?.id+"&"+req?.user?.code);
    } catch (error) {
      console.log(error)
    }
  });
// router.get('/auth/facebook/callback', (req, res, next) => {
//   passport.authenticate('facebook', (err, profile) => {
//     console.log("error >>>",err)
//       req.user = profile
//       next()
//   })(req, res, next)
// }, (req, res) => {
//   res.redirect("http://localhost:3000/loginSocial/" + req?.user?.id+"&"+req?.user?.code);
// })

router.post("/loginSocial", authSocialController.loginSuccess);
module.exports = router;
