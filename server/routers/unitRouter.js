const router = require('express').Router();
const Unit = require('../models/unitModel');

const auth = require('../middleware/auth');

router.get('/all', auth, async (req,res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch(err) {
    console.log (err);
    res.status(500).send();
  }
})

module.exports = router;