const router = require('express').Router();
const Recipe = require('../models/recipeModel');
const Day = require('../models/dayModel');
const {createEditDaySchema, mealSchemaRequired} = require('../validation/daySchema');

const User = require('../models/userModel');
const auth = require('../middleware/auth');

router.get('/all', auth, async (req,res) => {
  try {
    const days = await Day.find({ owner: req.userID });
    res.json(days);
  } catch(err) {
    console.log (err);
    res.status(500).send();
  }
});

// get day data
router.get('/:name', auth, async (req,res) => {
  try {
    const genPopulateQuery  = (meal) => {
      return {
        path: `${meal}`,
        populate: [{
          path: 'recipe',
          model: 'recipe',
          populate: [{
            path: 'ingredients',
            populate: {
              path: 'ingredientID',
              model: 'ingredient'
            },
          },
          {
            path: 'ingredients',
            populate: {
              path: 'unitID',
              model: 'unit'
            },
          }],
        }]
      }
    };

    const populateQueries = {
      path: 'meals',
      populate: [
        genPopulateQuery('breakfast'),
        genPopulateQuery('lunch'),
        genPopulateQuery('dinner'),
        genPopulateQuery('snack'),
      ]
    };
    const day = await Day.findOne({ owner: req.userID, name: req.params.name }).populate(populateQueries);
    if(day) {
      res.json(day);
    } else {
      res.status(404).json({errorMessage: 'not found'})
    }
  } catch(err) {
    console.log (err);
    res.status(500).send();
  }
});

// create day data
router.post('/create', auth, async (req,res) => {
  try {
    const { name, meals } = req.body;
    let savedDay;
    const validation = await createEditDaySchema.validate({name, meals}, {abortEarly: false});
    if(validation.error) {
      res.status(400).send(validation.error.details);
    }
    // check if day already exists
    const existingDay = await Day.findOne({ owner: req.userID, name });
    if(existingDay) {
      res.json({errorMessage: 'day exists', ...existingDay});
    } else {
      // create day
      const newDay = new Day({ owner: req.userID, name, meals });
      savedDay = await newDay.save();
    }

    res.json(savedDay);
  } catch(err) {
    console.log (err);
    res.status(500).send();
  }
});

// edit day data
router.post('/:name/edit', auth, async (req,res) => {
  try {
    const { meals } = req.body;
    const { name } = req.params;
    let savedDay;
    const validation = await createEditDaySchema.validate({name, meals}, {abortEarly: false});
    if(validation.error) {
      res.status(400).send(validation.error.details);
    }
    // check if day already exists
    const existingDay = await Day.find({ owner: req.userID, name });

    if(existingDay) {
      // update day
      savedDay = await Day.updateOne(
        { _id: existingDay._id },
        { $set: { meals } }
      );
      res.status(200).send();
    } else {
     
      res.json({errorMessage: 'This day data doesn\'t exist'})
    }

  } catch(err) {
    console.log (err);
    res.status(500).send();
  }
});

// update day meal only
router.post('/:name/:meal/edit', auth, async (req,res) => {
  try {
    const { recipe, ingredientsNeededIds, _id } = req.body;
    const { name, meal } = req.params;
    const validation = await mealSchemaRequired.validate({recipe, ingredientsNeededIds}, {abortEarly: false});
    if(validation.error) {
      res.status(400).send(validation.error.details);
    }    
    let savedDay;
    // find day
    const existingDay = await Day.findOne({ owner: req.userID, name });
    if(existingDay) {
      const newMeal = {
        recipe,
        ingredientsNeededIds
      }
      // update meal
      switch(meal) {
        case 'breakfast': 
          savedDay = await Day.update(
            { _id: existingDay._id },
            { "$set": { "meals.breakfast": newMeal} }
          );
          res.json({success: 'Day was updated'});
          break;
        case 'lunch':
          savedDay = await Day.update(
            { _id: existingDay._id },
            { "$set": { "meals.lunch": newMeal} }
          );
          res.json({success: 'Day was updated'});
          break;
        case 'dinner':
          savedDay = await Day.update(
            { _id: existingDay._id },
            { "$set": { "meals.dinner": newMeal} }
          );
          res.json({success: 'Day was updated'});
          break;
        case 'snack':
          savedDay = await Day.update(
            { _id: existingDay._id },
            { "$set": { "meals.snack": newMeal} }
          );
          res.json({success: 'Day was updated'});
          break;
      }

    } else {
      res.json({errorMessage: 'This day data doesn\'t exist'})
    }
    res.json({errorMessage: 'Something went wrong'})
  } catch(err) {
    console.log (err);
    res.status(500).send();
  }
});


module.exports = router;