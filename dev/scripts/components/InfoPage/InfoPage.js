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
    this.state = {
      // volumeIssuesArray: '',
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.volumeIssuesArray);
    this.setState({
      volumeIssuesArray: nextProps.volumeIssuesArray,
    })
  }
  render(){
    return(
      <div>
        <h1>This is the Info page</h1>
        {/* <Publisher /> */}
        {console.log(('from info page: ',this.props.volumeIssuesArray))}
      </div>
    )
  }
}

export default InfoPage;