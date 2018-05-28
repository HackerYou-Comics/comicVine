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

    let infoImg;
    let infoName;
    let infoDeck;
    let infoUrl;
    let infoVolumeName;
    if (singleSelection.image.screen_large_url !== null) {
      infoImg = <img src={singleSelection.image.screen_large_url} alt={singleSelection.name} />;
    }
    if (singleSelection.name !== null) {
      infoName = <h2>{singleSelection.name}</h2>;
    }
    if (singleSelection.deck !== null) {
      infoDeck = <p>{singleSelection.deck}</p>;
    }
    if (singleSelection.site_detail_url !== null) {
      infoUrl = <a href={singleSelection.site_detail_url}>More information</a>
    }
    if (singleSelection.volume.name !== null){
      infoVolumeName = <p>Volume: {singleSelection.volume.name}</p>
    }

    
    return(
      <div>
        <h1>This is the Info page</h1>
        {/* <Publisher /> */}
        {console.log(('from info page: ', this.props.individualId))}
        {console.log(('from info page: ', singleSelection))}
        <ul>
          {infoName}
          {infoImg}
          {infoDeck}
          {infoUrl}
          {infoVolumeName}
        </ul>
        
      </div>
    )
  }
}

export default InfoPage;