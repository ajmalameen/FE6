const users = require("../models/userSchema");

// register logic
exports.userRegister = async (req, res) => {
  try {
    console.log(req.files);

    // To get Image and CV urls
    const profileFile = req.files['user_profile'] ? req.files['user_profile'][0].filename : null;
    const cvFile = req.files['cv'] ? req.files['cv'][0].filename : null;

    const { name, email, mobile, location, password } = req.body;

    if (!name || !email || !mobile || !location || !password) {
      return res.status(403).json("All inputs are required!!!");
    }

    const preuser = await users.findOne({ email });
    if (preuser) {
      return res.status(403).json("The user already exists in our database....");
    }

    const newuser = new users({
      name,
      email,
      mobile,
      profile: profileFile,
      location,
      password,
      cv: cvFile,
    });

    await newuser.save();
    res.status(200).json(newuser);
  } catch (error) {
    res.status(401).json(error);
  }
};
