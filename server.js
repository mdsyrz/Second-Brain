var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");

const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

require("dotenv").config();
require("./config/database");

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "projecttwosession",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use(flash());

// Initialize passport and sessions for storing users info
//https: www.geeksforgeeks.org/node-js-authentication-using-passportjs-and-passport-local-mongoose/
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to use locally
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.render("./blogs/cover");
});

app.use(blogRoutes);
app.use(authRoutes);

module.exports = app;
