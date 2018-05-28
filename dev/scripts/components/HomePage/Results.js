import React from 'react';
import Issue from '../Issue';
import { log } from 'util';
import Publisher from '../Publisher';
import InfiniteScroll from 'react-infinite-scroller';

class Results extends React.Component {
    constructor() {
		super();

		this.state = {
			hasMoreItems: false,
			limitedResults: [],
		}
		this.loadMoreFunc = this.loadMoreFunc.bind(this);
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		if(nextProps.results.length > 0){
			this.setState({
				hasMoreItems: true
			})
		}
	}

	loadMoreFunc(page){
		console.log(this.props);
		let newArray = [];

		for(let i = 0; i < page*10; i++){
			if(i < this.props.results.length){
				newArray.push(this.props.results[i]);
			} else{
				this.setState({
					hasMoreItems: false
				})
			}
		}
		this.setState({
			limitedResults: newArray,
		})
	}

    render() {
        if (this.props.results !== []) {

			const items = [];
			this.state.limitedResults.map((result, index) => {
				items.push(
					<Issue

						userKey={this.props.userKey}
						key={index + result.id}
						infoId={result.id}
						issueImg={result.image.icon_url}
						issueName={result.name}
						issueNumber={result.issue_number}
						issueDescription={result.description}
						libraryId={this.props.libraryId}

						//grab id callback from form.js
						grabId={this.props.grabId}
						//sends the index as "id" to issue to be used on its li elements
						id={index}
					/>
				)
			})

            return (
                <ul>
					{this.props.userChoice === 'issues' ?
						<InfiniteScroll
							pageStart={0}
							loadMore={this.loadMoreFunc}
							hasMore={this.state.hasMoreItems}
							>

							<div className="issues">
								{items}
							</div>
						</InfiniteScroll>
						: null
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
											libraryId={this.props.libraryId}

											//grab id callback from form.js
											grabId={this.props.grabId}
											//sends the index as "id" to issue to be used on its li elements
											id={index}
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