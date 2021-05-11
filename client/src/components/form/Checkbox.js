import React from 'react'
import { useField } from 'formik';

function Checkbox(props) {
  const [field, meta] = useField(props);

  function onChange(e) {
    if(e.target.checked) {
     const newValues = props.values.push(e.target.value);
     props.setValues(newValues);
    } else {
      const index = props.values.indexOf(e.target.value);
      let newValues = [...props.values];
      if(index) {
        newValues.splice(index,1)
      }
      props.setValues(newValues)
    }
  }

  return (
    <>
        <label>{props.label}</label>
        <input type="checkbox" value={props.value} name={props.name} onChange={onChange} checked={props.values.includes(props.value)}/>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
    </>
  )
}

export default Checkbox
