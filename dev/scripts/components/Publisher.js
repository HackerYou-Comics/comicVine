// key = { index + result.id }
// publisherId = { result.id }
// publisherName = { result.name }
// publisherDescription = { result.deck }
// publisherImg = { result.image.small_url }
// locationAddress = { result.location_address }
// locationCity = { result.location_city }
// locationState = { result.location_state }


import React from 'react';
import { Link } from 'react-router-dom';

class Publisher extends React.Component {
  render() {
    return (
      <Link to={`/info/${this.props.publisherId}`}>
        <li key={this.props.publisherId}>
          <h2>{this.props.publisherName}</h2>
          <img src={this.props.publisherImg} alt={this.props.publisherName}/>
        </li>
      </Link>
    )
  }

}

export default Publisher; 