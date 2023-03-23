const express = require("express");
const routes = express.Router();
const User = require("../models/user");
const passport = require("passport");

// Get the signup form
routes.get("/register", async (req, res) => {
  res.render("auth/signup");
});

routes.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });
    const newUser = await User.register(user, req.body.pass);
    req.flash("success", "Registered Successfully");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

// Get the login form
routes.get("/login", async (req, res) => {
  res.render("auth/login");
});

routes.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `Welcome, ${req.user.username}!`);
    res.redirect("/blogs");
  }
);

// Logout the user from the current session
routes.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/login");
  });
});

module.exports = routes;
