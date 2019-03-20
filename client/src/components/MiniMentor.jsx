import React, {Component} from 'react';

import "../assets/css/mentor.css";

class MiniMentor extends Component {
  render() {

    const interests = this.props.interests.join(' ');
    const color = Math.floor(Math.random() * 16777215).toString(16);

    return (
      <section className="app-mentor_mini">
        <img alt="avatar" src={"https://api.adorable.io/avatars/" + this.props._id}/>
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>
        <p style={{backgroundColor: '#' + color, color: 'white'}}>
          {this.props.about}
        </p>
        <p>
          {interests}
        </p>
      </section>
    )
  }
}

export default MiniMentor