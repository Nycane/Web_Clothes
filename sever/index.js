const express = require("express");
const initRoutes = require("./routes");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
// const cookieParser = require('cookie-parser')
const cookieParser = require("cookie-parser");
require("./configs/passport");
const app = express();
// cors
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.CLIENT_URL
        : process.env.PRODUCTION_URL,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
passport.initialize();

initRoutes(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("connect localhost", process.env.PORT);
});
