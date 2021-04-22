const router = require('express').Router();
const Recipe = require('../models/recipeModel');
const {createRecipeSchema, editRecipeSchema} = require('../validation/recipeSchema');

const Ingredient = require('../models/ingredientModel');

const auth = require('../middleware/auth');

router.get('/:id', auth, async (req,res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    // const recipePopulated = await recipe.populate('owner').execPopulate();
    res.json(recipe);
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post('/create', auth, async (req,res) => {
  try {
    const { name, ingredients } = req.body;
    const validation = await createRecipeSchema.validate({name, ingredients}, {abortEarly: false});
    if(validation.error) {
      res.status(400).send(validation.error.details);
    }
    // check if ingredientID was not sent, create ingredient with sent ingredient name
    let mappedIngredients = [];
    if(ingredients.length > 0) {
      mappedIngredients = await Promise.all(ingredients.map(async (ingredient, index) => {
        try {
          if(!ingredient.ingredientID && ingredient.name) {
            const newIngredient = new Ingredient({ name: ingredient.name });
            const savedIngredient = await newIngredient.save();  
            return {
              ingredientID: savedIngredient._id,
              quantity: ingredient.quantity,
              unitID: ingredient.unitID
            }
          }
          return ingredient;
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
      }))
    }

    const newRecipe = new Recipe({ owner: req.userID, name, ingredients: mappedIngredients });
    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post('/:id/edit', auth, async (req,res) => {
  try {
    const { ingredients } = req.body;
    // TODO: Add edit name as well?
    const validation = await editRecipeSchema.validate({ingredients}, {abortEarly: false});
    if(validation.error) {
      res.status(400).send(validation.error.details);
    }
    // edit ingredients
    // check if ingredientID was not sent, create ingredient with sent ingredient name
    let mappedIngredients = [];
    if(ingredients.length > 0) {
      mappedIngredients = await Promise.all(ingredients.map(async (ingredient, index) => {
        try {
          if(!ingredient.ingredientID && ingredient.name) {
            const newIngredient = new Ingredient({ name: ingredient.name });
            const savedIngredient = await newIngredient.save();
  
            return {
              ingredientID: savedIngredient._id,
              quantity: ingredient.quantity,
              unitID: ingredient.unitID
            }
          }
          return ingredient;
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
      }))
    }

    const savedRecipe = await Recipe.updateOne(
      { _id: req.params.id }, 
      { $set: { ingredients: mappedIngredients } }
    );
    res.status(200).send();
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// search user's recipes
router.get("/", auth, async function(req, res) {
  if (req.query.search) {
    try {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      const results = await Recipe.find({ owner: req.userID , "name": regex });
      res.send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
});

module.exports = router;