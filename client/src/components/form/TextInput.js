import React from 'react';
// import ReactDOM from 'react-dom';
import { useField } from 'formik';
// import * as Yup from 'yup';

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className="font-semibold">{label}</label>
      <input className={props.type === 'search' ? "card-input-search" : "card-input"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextInput;