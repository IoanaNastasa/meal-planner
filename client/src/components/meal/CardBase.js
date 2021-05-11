import React from 'react'

function CardBase(props) {
  return (
    <div className="container shadow-lg p-5">
      {props.subtitle ? <h3 className="text-xs font-light text-gray-500">{props.subtitle}</h3> : null} 
      {props.title ?<h3 className="text-2xl mb-2 font-bold">{props.title}</h3> : null}
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}
   
export default CardBase
