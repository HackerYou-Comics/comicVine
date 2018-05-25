import React from 'React';
import { NavLink,
        Redirect } from 'react-router-dom';

class Issue extends React.Component{
    render(){
        if (this.props.issueClicked) {
            return <Redirect to='/info' />
        }
        return(
            <li onClick={() => this.props.handleIssueClick(this.props.issueId)}>
                <div>
                    <img src={this.props.issueImg} alt={this.props.issueName} />
                    <p>{this.props.issueName}</p>
                    <p>{this.props.issueNumber}</p>
                </div>
            </li>
        )
    }

}

export default Issue; 