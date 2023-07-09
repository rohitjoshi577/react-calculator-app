import React from 'react';
import './Button.style.css';

const Button = props => {
  return (
    <button
      className={props.className ? props.className + ' btn' : 'btn'}
      onClick={() => props.handleClick(props.children, props.type)}
    >
      {props.children}
    </button>
  );
};

export default Button;
