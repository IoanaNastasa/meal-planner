const router = require('express').Router();
const Ingredient = require('../models/ingredientModel');
const auth = require('../middleware/auth');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// search ingredients
router.get("/", auth, async function(req, res) {
  if (req.query.search) {
    try {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      const results = await Ingredient.find({ "name": regex });
      res.send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
});

module.exports = router;