import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Publisher from '../Publisher';


class InfoPage extends React.Component{
  constructor(){
    super();
    

  }

  render(){
    return(
      <div>
        <h1>This is the Info page</h1>
        {/* <Publisher /> */}
        {console.log(('from info page: ', this.props.individualId))}
        {console.log(('from info page: ', this.props.allSearches[this.props.individualId]))}
        <ul>
          <li>{this.props.allSearches[this.props.individualId].name}</li>
          <li>{this.props.allSearches[this.props.individualId].description}</li>

        </ul>
        
      </div>
    )
  }
}

export default InfoPage;