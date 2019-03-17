import React from 'react';
import '../assets/css/wrapper.css';

const Wrapper = (props) => {
  return (
    <div className="app-wrapper">
      {props.children}
    </div>
  )
};

export default Wrapper;