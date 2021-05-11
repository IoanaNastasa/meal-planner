import React from 'react'

function Tab(props) {
  return (
    <div onClick={props.onClick} className={`flex-1 bg-green-500 py-2 text-center	 uppercase ${props.active ? "text-white border-b-2 border-white" : " text-gray-200"}`}>
      {props.text}
    </div>
  )
}

export default Tab
