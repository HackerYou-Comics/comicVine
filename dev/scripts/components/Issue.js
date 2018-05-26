import React from 'React';
import { Link } from 'react-router-dom';

class Issue extends React.Component{
    render(){
        return(
            <Link to={`/${this.props.infoId}`}>
                <li>
                    <div>
                        <img src={this.props.issueImg} alt={this.props.issueName} />
                        <p>{this.props.issueName}</p>
                        <p>{this.props.issueNumber}</p>
                    </div>
                </li>
            </Link>
        )
    }

}

export default Issue; 

//redirect for future references
// if (this.props.issueClicked) {
//     return <Redirect to='/info' />
// }