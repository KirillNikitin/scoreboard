import React, { Component } from 'react'
import Card from './card'

import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

const sortTypes = {
	up: {
		class: 'sort-up',
		fn: (a, b) => a.scores - b.scores
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => b.scores - a.scores
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
};

class Contacts extends Component {
	constructor(props) {
        super(props);
        this.state = {
			currentSort: 'default'
        };
    }

	
	onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;
		
		if(currentSort === 'down') nextSort = 'up';
		else if(currentSort === 'up') nextSort = 'default';
		else if(currentSort === 'default') nextSort = 'down';
		
		this.setState({
			currentSort: nextSort
		})
	};
	
	render() {
	const { contacts } = this.props;	
	const { currentSort } = this.state;
		

      return (
        <div className="container">
          <center><h1>Scoreboard</h1></center>
          {[...contacts].sort(sortTypes[currentSort].fn).map((contact) => (            
			
			  <Card card={contact} key={contact.id} />              
            
          ))}
		  
		  <button className="button sort-button" onClick={this.onSortChange}>
			Sort by score
			{sortTypes[currentSort].class === 'sort-down' ? <FaSortNumericDown /> : sortTypes[currentSort].class === 'sort-up' ? <FaSortNumericUp /> : null}
    		</button>
        </div>
      )    
	}	
}    

export default Contacts