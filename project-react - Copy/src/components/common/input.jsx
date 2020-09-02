import React from "react";

const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} className="form-control" id={name} name={name} />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};
export default Input;
