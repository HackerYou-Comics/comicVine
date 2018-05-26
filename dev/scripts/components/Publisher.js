
import React from 'react';
import { Link } from 'react-router-dom';

class Publisher extends React.Component {
  render() {
    return (
      <Link to={`/${this.props.infoId}`}>
        <li key={this.props.publisherId}>
          <h2>{this.props.publisherName}</h2>
          <img src={this.props.publisherImg} alt={this.props.publisherName}/>
        </li>
      </Link>
    )
  }

}

export default Publisher; 