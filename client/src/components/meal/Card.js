import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import CardEmpty from './CardEmpty';
import CardSearch from './CardSearch';
import CardEdit from './CardEdit';

function Card(props) {
  console.log({'test': props.dayMethods})
  const [ mode, setMode ] = useState();
  const recipe = props?.value?.recipe;
  useEffect(() => {
    if(!recipe) {
      setMode('empty')
    } else {
      setMode('view')
    }
  }, [recipe]);
  return (
    <div className="container shadow-lg p-5 mb-10 border">
      {props.value?.recipe?.name ? <h3 className="text-xs font-light text-gray-500">{props.value.recipe.name}</h3> : null} 
      {props.title ? <h3 className="text-2xl mb-2 font-bold">{props.title}</h3> : null}
      <div className="container">
        {mode === 'empty' ? <CardEmpty setMode={setMode} /> : null}
        {mode === 'view' ? <CardView setMode={setMode} value={props.value} 
          editIngredientsNeeded={(values) => {props.dayMethods.editIngredientsNeeded(values, props.title)}}
          /> : null}
        {mode === 'search' ? <CardSearch setMode={setMode} addExisting={(recipe) => props.dayMethods.addExisting(recipe, props.title)}/> : null}
        {(mode === 'edit' || mode === 'create')  ? <CardEdit setMode={setMode} mode={mode} value={props.value} title={props.title} addNew={props.dayMethods.addNew}/> : null}
      </div>
    </div>
  )
}
   
export default Card;
