const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const upload = require('../multerConfig/storageConfig');

// register
router.post('/employee/register', upload.fields([
  { name: 'user_profile', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]), userController.userRegister);

module.exports = router;