import React from 'react';

import Tab from './Tab';

function Tabs(props) {

  return (
    <div className="flex w-screen justify-items-stretch -ml-5 mb-5">
      <Tab text="Mon" active={props.day === 'mon'} onClick={() => props.setDay('mon')}/>
      <Tab text="Tue" active={props.day === 'tue'} onClick={() => props.setDay('tue')} />
      <Tab text="Wed" active={props.day === 'wed'} onClick={() => props.setDay('wed')} />
      <Tab text="Thu" active={props.day === 'thu'} onClick={() => props.setDay('thu')} />
      <Tab text="Fri" active={props.day === 'fri'} onClick={() => props.setDay('fri')} />
      <Tab text="Sat" active={props.day === 'sat'} onClick={() => props.setDay('sat')} />
      <Tab text="Sun" active={props.day === 'sun'} onClick={() => props.setDay('sun')} />
    </div>
  )
}

export default Tabs
