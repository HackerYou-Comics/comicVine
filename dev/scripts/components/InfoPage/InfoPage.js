import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

class InfoPage extends React.Component{
  constructor(){
    super();
    this.state = {
      volumeIssuesArray: [],
    }
  }
  componentWillMount(){
    this.setState({
      volumeIssuesArray: this.props.volumeIssuesArray,
    })
  }
  render(){
    return(
<<<<<<< HEAD
      <h1>This is the Info page</h1>
      
=======
      <div>
        <h1>This is the Info page</h1>
        {console.log(('from info page: ',this.props.volumeIssuesArray))}
      </div>
>>>>>>> 71fa67c0f6835cf1896a98e02dc4bd71e8bc9462
    )
  }
}

export default InfoPage;