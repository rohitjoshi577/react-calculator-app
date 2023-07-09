import React from 'react';
import './Input.style.css';

const Input = props => {
  const { className } = props;
  return <div className={`input-box ${className}`}>{props.input}</div>;
};
export default Input;
