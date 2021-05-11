import React from 'react';
import { useField } from 'formik';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className="font-semibold">{label}</label>
      <select {...field} {...props} className="card-input" />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default Select;