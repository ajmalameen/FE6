const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const upload = require('../multerConfig/storageConfig');

// Register
router.post('/employee/register', upload.fields([
  { name: 'user_profile', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]), userController.userRegister);

// Login
router.post('/employee/login', userController.userLogin);

module.exports = router;
