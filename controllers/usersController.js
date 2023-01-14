const Users = require('../models/users')

const Messages = require('../models/messages')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");


//------------------------------------------------

exports.sign_up_get = (req, res) =>{
  res.render('signup_form')
}

exports.sign_up_post = [
  check('password').exists(),
  check('confirm_password')
    .exists()
    .custom((value, { req }) => {
      if(value !== req.body.password){
        throw new Error('Passwords don\'t match')
      }
      return true
    }),
    
  (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const plainPassword = req.body.password
    
    bcrypt.hash(plainPassword, 10, (err, hashedPassword) =>{
      if(err){
        return next(err)
      }
      const user = new Users({
        firstname: req.body.first_name,
        lastname: req.body.last_name,
        username: req.body.username,
        password: hashedPassword
      }).save(err => {
        if (err) { 
          return next(err);
        }
        res.redirect("/");
      });
      
    })
  }
];

exports.log_in_get = (req, res) =>{
  res.render('login_form', {user: req.user})
}



exports.log_in_post = (req, res, next) =>{
  passport.authenticate("local", (err, user, info) =>{
    console.log(user);
    if(err) {
      return next(err)
    }
    if(!user){
      return res.redirect('/login')
    }
    req.logIn(user, (err) =>{
      if(err) {
        return next(err)
      }
      //return res.render('index', {user: user})
      return res.redirect('/')
    })
  })(req,res,next)
}

exports.log_out_get = (req,res,next) =>{
  req.logout(function (err){
    if(err) return next(err)
    res.redirect('/')
  })
}

exports.members_get = (req, res) =>{
  res.render('members', {user: req.user})
}

exports.members_post = (req, res, next) =>{
  
  if(req.body.password == 22 && req.user){
    Users.findOneAndUpdate({username: req.user.username}, {$set:{membership: true}}, {new: true}, (err, user) =>{
      console.log('user',user)
      if(err){
        return next(err)
      }
      res.render('index', {user: user})
    })
  } else {
    res.render('members', {user: req.user, wrong: 'Wrong! Try again'})                  
  }
}

