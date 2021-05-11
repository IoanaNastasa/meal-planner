import React from 'react';

function CardEmpty(props) {
  return (
    <div className="flex space-x-5">
      <button className="card-btn" onClick={() => props.setMode('search')}>Add existing</button>
      <button className="card-btn" onClick={() => props.setMode('create')}>Add new</button>
    </div>
  )
}
   
export default CardEmpty;
