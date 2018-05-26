import React from 'react';
import Issue from '../Issue';
import { log } from 'util';
import Publisher from '../Publisher';

class Results extends React.Component{
    constructor(){
        super();

    }

    render(){
        if (this.props.results !== []) {
            return (
                <ul>
                    {this.props.userChoice === 'issues'? 
                        (
                            this.props.results.map((result, index) => {
                                {/* console.log(result); */ }
                                return (
                                    <Issue
                                        key={index + result.id}
                                        infoId={result.id}
                                        // issueImg={result.image.medium_url}
                                        issueImg={result.image.icon_url}
                                        issueName={result.name}
                                        issueNumber={result.issue_number}
                                        issueDescription={result.description} 
                                        />
                                )
                            })
                        ):null
                    }
                    {this.props.userChoice === 'publishers' ?
                        (
                            this.props.results.map((result, index) => {
                                { console.log(result);}
                                return (
                                    <Publisher
                                        key={index + result.id}
                                        infoId={result.id}
                                        publisherName={result.name}
                                        publisherDescription={result.deck}
                                        publisherImg={result.image.icon_url}/>
                                )
                            })
                        ) : null
                    }
                    
                </ul>
            )
        }
    }
}

export default Results;