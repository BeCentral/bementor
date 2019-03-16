import React from 'react';
import '../assets/css/container.css';

const Container = (props) => {
  return (
    <div className="app-container">
      {props.children}
    </div>
  )
};

export default Container;