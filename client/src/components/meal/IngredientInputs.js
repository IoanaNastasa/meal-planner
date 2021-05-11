import React from 'react'

function IngredientInputs(props) {
  return (
    <div className="flex mb-5 container space-x-2">
      <div className="flex-shrink-0">
        <input className="card-input" type="text" placeholder="Ingredient"/>
      </div>
      <div className="flex-shrink">
        <input className="card-input" type="text" placeholder="Quantity"/>
      </div>
      <div className="flex-shrink">
        <select name="unit" className="card-input">
          <option type="hidden">Select unit</option>
          {props.units.length > 0 ? props.units.map(unit => <option key={unit._id} value={unit._id}>{unit.name}</option>) : null}
        </select>
      </div>
    </div>
  )
}

export default IngredientInputs
