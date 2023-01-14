const Users = require('../models/users')

const Messages = require('../models/messages')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");


exports.index = (req,res) =>{
  Messages.find()
    .sort([['timestamp', 'ascending']])
    .exec((err, list_messages) =>{
      if(err){
        return next(err)
      }
      res.render('index', {
        user: req.user,
        message_list: list_messages
      })
    })
  
}

exports.message_get = (req, res) => {
  res.render('message_form', {user: req.user})
}

exports.message_post = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  const message = new Messages({
    username: req.user.username,
    messageTitle: req.body.title,
    messageBody: req.body.body
  })

  message.save((err)=>{
    if(err) return next(err)
    res.render('index', {
      user: req.user,
      
    })
  })
  
}
