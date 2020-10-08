const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./auth/auth-router");
const languageRouter = require("./language/language-router");
const userRouter = require("./user/user-router");

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
const whitelist = [
  "http://localhost:3000",
  "https://langful.kayleighkat98.vercel.app",
  "https://langful.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/language", languageRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

module.exports = app;
