const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/authenticate.middleware');

router.get('/me', authenticate, userController.getProfile);

module.exports = router;