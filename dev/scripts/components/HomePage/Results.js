import React from 'react';
import Issue from '../Issue';
import { log } from 'util';
import Publisher from '../Publisher';

class Results extends React.Component {
    constructor() {
        super();

    }

    render() {
        if (this.props.results !== []) {
            return (
                <ul>
                    {this.props.userChoice === 'issues' ?
                        (
                            this.props.results.map((result, index) => {
                                {/* console.log(result); */ }
                                if(result.image !== null){
                                    return (
                                        <Issue
											id={index}
                                            userKey={this.props.userKey} 
                                            key={index + result.id}
                                            infoId={result.id}
                                            // issueImg={result.image.medium_url}
                                            issueImg={result.image.icon_url}
                                            issueName={result.name}
                                            issueNumber={result.issue_number}
                                            issueDescription={result.description}
											libraryId={this.props.libraryId}
											grabId={this.props.grabId}
                                        />
                                    )
                                }
                            })
                        ) : null
                    }
                    {this.props.userChoice === 'publishers' ?
                        (
                            this.props.results.map((result, index) => {
                                { console.log(result); }
                                if(result.image !== null){
                                    return (
                                        <Publisher
                                            key={index + result.id}
                                            infoId={result.id}
                                            publisherName={result.name}
                                            publisherDescription={result.deck}
                                            publisherImg={result.image.icon_url} 
                                            publisherUrl={result.site_detail_url}
                                        />
                                    )
                                }
                            })
                        ) : null
                    }

                </ul>
            )
        }
    }
}

export default Results;