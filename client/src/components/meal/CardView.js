import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import Checkbox from '../form/Checkbox';

function CardView(props) {
  const initialValues = {ingredientsNeededIds: props.value.ingredientsNeededIds};
  function onSubmit(values) {
    props.editIngredientsNeeded(values.ingredientsNeededIds)    
  }
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    render={({ values, setFieldValue }) => (
      <Form>
        <p className="font-semibold mb-5">Ingredients</p>
        {props?.value?.recipe?.ingredients ? props?.value?.recipe?.ingredients.map(ingredient => {
          return <div key={ingredient._id} className="flex space-x-5 items-center">
            <Field type="checkbox" value={ingredient.ingredientID._id} name="ingredientsNeededIds" />
            <p>{ingredient.ingredientID.name}</p>
            <p>{ingredient.quantity} {ingredient.unitID.name}</p>
          </div>
        }) : null}

        <div className="flex space-x-5 mt-5">
          <button className="card-btn" type="submit">Submit</button>
          <button className="card-btn" type="button">See recipe</button>
          <button className="card-btn" type="button" onClick={() => props.setMode('edit')}>Edit ingredients</button>
        </div>
      </Form>
      )}
    />
  )
}
   
export default CardView
