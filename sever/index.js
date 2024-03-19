const express = require("express");
const initRoutes = require("./routes");
const cors = require("cors");
require('dotenv').config();;
const passport = require("passport");
// const cookieParser = require('cookie-parser')
const cookieParser = require("cookie-parser");
require("./configs/passport");
const app = express();
// cors
// const corsOptions = {
//     origin: 'http://localhost:3000', // replace with your client app URL
//     credentials: true,
//     // methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
//     // allowedHeaders: ['Content-Type', 'Authorization']
// };
console.log(process.env.NODE_ENV)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.CLIENT_URL
        : process.env.PRODUCTION_URL, // replace with your client app URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
passport.initialize();

initRoutes(app);
const port = process.env.PORT || 3000;
app.listen(process.env.NODE_ENV === "production"?10000:port, () => {
  console.log("connect localhost", process.env.PORT);
});
