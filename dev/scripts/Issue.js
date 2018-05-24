import React from 'react';

class Issue extends React.Component{
    render(){
        return (
            <li onClick={() => {this.props.clickHandler(this.props.volumeId)}}>{this.props.issueName}</li>
        )
    }
}

export default Issue