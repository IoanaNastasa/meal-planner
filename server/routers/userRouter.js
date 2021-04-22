const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation/userSchema');

const User = require('../models/userModel');

router.post('/', async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;
    // validation
    const validation = await registerSchema.validate(req.body, {abortEarly: false});
    if(validation.error) {
      res.status(400).send(validation.error.details);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: 'An account with this email already exists.',
    });

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save new user
    const newUser = new User({
      email, passwordHash
    });
    const savedUser = await newUser.save();

    // log user in

    // sign token
    const token = jwt.sign({
      userID: savedUser._id
    }, process.env.JWT_SECRET);

    // sent token in http-only cookie
    res.status(200).cookie('token', token, {
      httpOnly: true
    }).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    const validation = await loginSchema.validate(req.body, {abortEarly: false});
    if(validation.error) {
      return res.status(400).send(validation.error.details);
    }

    const existingUser = await User.findOne({email});
    if(!existingUser) {
      return res.status(401).json({
          errorMessage: 'Wrong email or password.',
      });
    }
    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if(!passwordCorrect) {
      return res.status(401).json({
        errorMessage: 'Wrong email or password.',
      });
    }

    // log user in

    // sign token
    const token = jwt.sign({
      userID: existingUser._id
    }, process.env.JWT_SECRET);

    // sent token in http-only cookie
    return res.status(200).cookie('token', token, {
      httpOnly: true
    }).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/logout', async (req, res) => {
  res.status(200).cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  }).send();
});

router.get('/loggedIn', async (req, res) => {
  try {
    const token = req.cookies.token;
    if(!token) res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res.json(true);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
});

module.exports = router;