import React, { useState, useEffect, useCallback } from 'react'
import Tabs from '../layout/Tabs';
import Card from '../components/meal/Card';
import axios from 'axios';

function Day() {
  const [day, setDay] = useState('mon');
  const [dayData, setDayData] = useState({
    breakfast: {},
    lunch: {},
    dinner: {},
    snack: {}
  });

  const getDayData = useCallback(
    async () => {
        try{
          const dayDataRes = await axios.get(`http://localhost:5000/day/${day}`, { validateStatus: false });
          if(dayDataRes.status === 200) {
            setDayData(dayDataRes.data.meals)
          } else {
            // day doesn't exist, create Day  
            const dayData = {
              name: day,
              meals: {}
            }
            const savedDayRes = await axios.post('http://localhost:5000/day/create', dayData);
            if(savedDayRes.status === 200) {
              setDayData(savedDayRes.data.meals)
            }
          } 
        } catch(err) {
          console.log(err)
        }
    }, [day],
  )

  useEffect(() => {
    getDayData();
  }, [getDayData]);

  async function addNew(recipe) {
    try {
      const { name, ingredients } = recipe;
      // save recipe
      const newRecipeResponse = await axios.post('http://localhost:5000/recipe/create', {
        name,
        ingredients
      });
      console.log({newRecipeResponse})
      if(newRecipeResponse.status === "200" || newRecipeResponse.status === 200) {
        // save day data
        const dayMealResponse = await axios.post(`http://localhost:5000/day/${day}/breakfast/edit`, {
          recipe: newRecipeResponse.data._id,
          ingredientsNeededIds: newRecipeResponse.data.ingredients.map(ingredient => ingredient.ingredientID),
        });
        console.log('dayMealResponse', dayMealResponse)
        // update day state
        getDayData();
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function addExisting(recipe, meal) {
    try {
      let ingredientsNeededIds = recipe.ingredients.map(ingredient => ingredient._id);
      // save recipe
      const updateMealResponse = await axios.post(`http://localhost:5000/day/${day}/${meal}/edit`, {
        recipe: recipe._id,
        ingredientsNeededIds
      });
      console.log({updateMealResponse})
      getDayData();

    } catch (err) {
      console.log(err)
    }
  }

  function editExisting() {
    // update recipe
    // update day data
    // update day state
  }

  async function editIngredientsNeeded(ingredientsNeededIds, meal) {
    // update day data
    try {
      // save recipe
      const updateMealResponse = await axios.post(`http://localhost:5000/day/${day}/${meal}/edit`, {
        recipe: dayData.breakfast.recipe._id,
        ingredientsNeededIds
      });
      getDayData();

    } catch (err) {
      console.log(err)
    }
    // update day state
  }

  return (
    <div>
      <Tabs setDay={setDay} day={day} />
      <Card title="breakfast" value={dayData.breakfast} dayMethods={{addNew, editIngredientsNeeded, addExisting}}/>
      <Card title="lunch" value={dayData.lunch}  dayMethods={{addNew, editIngredientsNeeded, addExisting}} />
      <Card title="dinner" value={dayData.dinner} dayMethods={{addNew, editIngredientsNeeded, addExisting}} />
      <Card title="snack" value={dayData.snack}  dayMethods={{addNew, editIngredientsNeeded, addExisting}} />
    </div>
  )
}

export default Day
