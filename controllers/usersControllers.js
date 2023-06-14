const jwt = require('jsonwebtoken');
const users = require('../models/userSchema');
const bcrypt = require('bcrypt');

// Middleware function to verify JWT token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('Access token not found!');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json('Invalid or expired token!');
    }
    req.user = user;
    next();
  });
};

// register logic
exports.userRegister = async (req, res) => {
  try {
    console.log(req.files);

    // To get Image and CV urls
    const profileFile = req.files['user_profile'] ? req.files['user_profile'][0].filename : null;
    const cvFile = req.files['cv'] ? req.files['cv'][0].filename : null;

    const { name, email, mobile, location, password } = req.body;

    if (!name || !email || !mobile || !location || !password) {
      return res.status(403).json('All inputs are required!!!');
    }

    const preuser = await users.findOne({ email });
    if (preuser) {
      return res.status(403).json('The user already exists in our database....');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new users({
      name,
      email,
      mobile,
      profile: profileFile,
      location,
      password: hashedPassword,
      cv: cvFile,
    });

    await newuser.save();
    res.status(200).json(newuser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// login logic
exports.userLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json('Name, email, and password are required!');
    }

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(403).json('Invalid email or password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json('Invalid email or password!');
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(401).json(error);
  }
};
