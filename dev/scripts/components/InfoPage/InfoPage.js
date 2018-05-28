import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Publisher from '../Publisher';
import axios from 'axios';
import Qs from 'qs';
import InfiniteScroll from 'react-infinite-scroller';

//comicVine Api Key
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';
let singleSelection;

class InfoPage extends React.Component{
  constructor(){
    super();
    
    this.state = {
      volumeIssuesArray: [],
      hasMoreItems: true,
    }
    this.getVolumes = this.getVolumes.bind(this);
    this.loadMoreFunc = this.loadMoreFunc.bind(this);
  }

  //makes the API call to get volume data based on inital api call's returned volume id
  getVolumes(volumeId, page) {

    axios({
      url: "http://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        // "https://comicvine.gamespot.com/api/volume/4050-796/"
        reqUrl: `https://comicvine.gamespot.com/api/volume/4050-${volumeId}`,
        params: {
          api_key: apiKey,
          format: 'json'
        },
        proxyHeaders: {
          'headers_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((vol) => {
      if (vol.data.error === 'Object Not Found') {
        console.log("No volume :(");

      } else {
        //volume data and all the issues in the volume
        const volIssues = vol.data.results.issues;
        //volumeIssuesArray clone
        const volumeIssuesArrayClone = [...volumeIssuesArrayClone];
        let reducedArray = [];
        //only returns 10. over 900 crashes browser
        for (let i = 0; i < page*10; i++) {
          volumeIssuesArrayClone.push(volIssues[i]);
        }
        //first array is undefined for some reason
        //filter all arrays if they are undefined
        reducedArray = volumeIssuesArrayClone.filter(issue => issue !== undefined);

        this.setState({
            volumeIssuesArray: reducedArray
        }, () => {
            console.log(this.state.volumeIssuesArray);
        })
      }

      

    });
  }

  loadMoreFunc(page){
    if (this.props.userChoice === 'issues'){
      this.getVolumes(singleSelection.volume.id, page);
    }
  }

  render(){

    //object of data for the selected issue/publisher
    singleSelection = this.props.allSearches[this.props.individualId];
    if(singleSelection === undefined){
      return null
    }

    let infoImg;
    let infoName;
    let infoDeck;
    let infoUrl;
    let infoVolumeName;


    //checks what the userChoice was on Form.js set the conditional values according to render or publishers or issues
    if (this.props.userChoice === 'publishers'){
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

    } else{
      if (singleSelection.volume.name !== null){
        infoVolumeName = <p>Volume: {singleSelection.volume.name}</p>
      }
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
      
    }





    const items = [];
    if(this.state.volumeIssuesArray.length !== 0){
      this.state.volumeIssuesArray.map((issue, index) => {
        items.push (
          <div key={issue.name+index}>
            <p>{issue.name}</p>
            <p>Issue #{issue.issue_number}</p>
            <p></p>
          </div>
        )
      })
    }
    

    
    return(
      <div>
        <h1>This is the Info page</h1>
        {/* <Publisher /> */}
        {console.log(('from info page: ', this.props.individualId))}
        {console.log(('from info page: ', singleSelection))}
        <div>
          {infoName}
          {infoImg}
          {infoDeck}
          {infoUrl}
          {infoVolumeName}

          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMoreFunc}
            hasMore={this.state.hasMoreItems}
            >

            <div className="moreOfIssues">
              {items}
            </div>
          </InfiniteScroll>

        </div>
        
      </div>
    )
  }
}

export default InfoPage;