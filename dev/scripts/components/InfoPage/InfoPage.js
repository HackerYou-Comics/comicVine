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

    //object of data for the selected issue/publisher
    const singleSelection = this.props.allSearches[this.props.individualId];

    //

    
    return(
      <div>
        <h1>This is the Info page</h1>
        {/* <Publisher /> */}
        {console.log(('from info page: ', this.props.individualId))}
        {console.log(('from info page: ', singleSelection))}
        <ul>
          <li>{singleSelection.name}</li>
          <li>{singleSelection.description}</li>
          <img src={singleSelection.image.screen_large_url} alt={singleSelection.name}/>
        </ul>
        
      </div>
    )
  }
}

export default InfoPage;