const express = require('express');

const router = express.Router();

const messages_controller = require('../controllers/messagesController')

const users_controller = require('../controllers/usersController')

/* GET home page. */

router.get('/', users_controller.index)

router.get('/signup', users_controller.sign_up_get)

router.post('/signup', users_controller.sign_up_post)

router.get('/login', users_controller.log_in_get)

router.post('/login', users_controller.log_in_post)

router.get('/members', users_controller.members_get)

router.post('/members', users_controller.members_post)



module.exports = router;