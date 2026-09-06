const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/authenticate.middleware');
const authorize = require('../middlewares/authorize.middleware');

router.get('/me', authenticate, userController.getProfile);
router.get('/admin-dashboard', authenticate, authorize('admin'), userController.getAdminDashboard);

module.exports = router;