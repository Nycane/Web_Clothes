require("dotenv").config();
const authSocialService = require("../service/authSocialService");
const userService = require("../service/userService");
const { v4: uuidv4 } = require("uuid");
var passport = require("passport");
const constant = require("../constant");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "development"
          ? process.env.GOOGLE_REDIRECT_URL_LOCAL
          : process.env.GOOGLE_REDIRECT_URL_HOST,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile?.id) {
          const code = uuidv4();
          const user = userService.selectUserById(profile.id);
          if (user.length === 0) {
            await authSocialService.insertUserSocial(
              profile.id,
              constant.ROLE_DEFAULT,
              profile.displayName,
              profile.emails[0].value,
              profile.photos[0].value,
              constant.TYPE_LOG_SOCIAL,
              code
            );
          } else {
            await authSocialService.updateCode(code, profile.id);
          }
          profile.code = code;
          return cb(null, profile);
        }
        return cb(error, profile);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "development"
          ? process.env.FACEBOOK_REDIRECT_URL_LOCAL
          : process.env.FACEBOOK_REDIRECT_URL_HOST,
      profileFields: ["id", "displayName", "photos", "emails"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile?.id) {
          const code = uuidv4();
          const user = await userService.selectUserById(profile.id);
          if (user.length === 0) {
            await authSocialService.insertUserSocial(
              profile.id,
              constant.ROLE_DEFAULT,
              profile.displayName,
              profile.emails[0].value,
              profile.photos[0].value,
              constant.TYPE_LOG_SOCIAL,
              code
            );
          } else {
            await authSocialService.updateCode(code, profile.id);
          }
          profile.code = code;
          return cb(null, profile);
        }
        return cb(error, profile);
      } catch (error) {
        return cb(error, profile);
        console.log(error);
      }
    }
  )
);
