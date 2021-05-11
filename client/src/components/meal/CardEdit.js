import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import TextInput from '../form/TextInput';
import Select from '../form/Select';
import axios from 'axios';

function Card(props) {
  const initialValues = props.mode === 'create' ? {
    name: '',
    ingredients: []
  } : props.value.recipe;
  const [units, setUnits] = useState([]);

  useEffect(() => {
    async function getAllUnits() {
      try {
        const unitsResponse = await axios.get('http://localhost:5000/unit/all');
        setUnits(unitsResponse.data);
      } catch (err) {
        console.log(err)
      }
    }
    getAllUnits();
  }, []);

  async function onSubmit(values) {
    props.addNew(values)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ values }) => (
        <Form>
          <div className="w-80 mb-5 flex-shrink">
            <TextInput label="Recipe Name" name="name" />
          </div>
          <FieldArray
            name="ingredients"
            render={arrayHelpers => (
              <div>
                {values.ingredients.length > 0 ? values.ingredients.map((ingredient, index) => (
                  <div key={index} className="divide-black">
                    
                    <div className="">
                      <div className="mr-5 w-80">
                        <TextInput label="Ingredient Name" name={`ingredients.${index}.name`} />
                      </div>
                      <div className="mr-5 w-80">
                        <TextInput label="Quantity" name={`ingredients.${index}.quantity`} />
                      </div>
                      <div className="mr-5 w-80 flex flex-col">
                        <Select label="Unit" name={`ingredients.${index}.unitID`}>
                          {units.length > 0 ? units.map(unit => <option key={unit._id} value={unit._id}>{unit.name}</option>) : null}
                        </Select>
                      </div>
                    </div>
        
                    <button
                      className="bg-green-500 text-white p-2 rounded font-semibold uppercase tracking-wide mb-5 mt-2"
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >Remove</button>
                  </div>
                  
                )) : null }
                <button
                  className="bg-green-500 text-white p-2 rounded font-semibold uppercase tracking-wide mb-5"
                  type="button"
                  onClick={() => arrayHelpers.push({ name: '', quantity: '', unitID: '' })}
                >+ Add new</button>
              </div>
            )}
          />
          <div className="flex space-x-5">
            <button className="card-btn" type="submit">Save</button>
          </div>
        </Form>
      )}
    />
  )
}
   
export default Card
