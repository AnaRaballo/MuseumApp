// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");

// User model
const User = require("../models/user");
const Art = require("../models/artwork")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const ensureLogin = require("connect-ensure-login");

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login", {'message': req.flash('error')});
  });
  
  authRoutes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));

  authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });

  function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()){
          return next();
      } else {
          res.redirect('/login')
      }
  }

  authRoutes.post('/private', ensureAuthenticated, (req, res, next) =>{
      const newArt = new Art ({
          name: req.body.name,
          size: req.body.size,
          technique: req.body.technique,
          owner: req.user._id
      })
      newArt.save ((err) => {
          if (err) {return next(err);}
          else {
              res.redirect('/private');
          }
      })
  });


  authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });


  //OAuth - Facebook Configuration
//   authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
// authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
//   successRedirect: "/private-page",
//   failureRedirect: "/"
// }));


//OAuth - Google Configuration
// authRoutes.get("/auth/google", passport.authenticate("google", {
//   scope: ["https://www.googleapis.com/auth/plus.login",
//           "https://www.googleapis.com/auth/plus.profile.emails.read"]
// }));

// authRoutes.get("/auth/google/callback", passport.authenticate("google", {
//   failureRedirect: "/",
//   successRedirect: "/private-page"
// }));
  

module.exports = authRoutes;