import React, {Component} from 'react'
import { MdAdd, MdDone, MdClose} from 'react-icons/md';

class Card extends Component {
	constructor(props) {
        super(props);
        this.state = {
            active: false, points: '', showAddFunc: false, inputFlag: false
        };
		this.inputRef = React.createRef();
		this.toggleClass = this.toggleClass.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.inputFocus = this.inputFocus.bind(this);
		this.showAddFunc = this.showAddFunc.bind(this);
		this.addScorePoints = this.addScorePoints.bind(this);
		this.hideScorePointsBlock = this.hideScorePointsBlock.bind(this);
		this.inputFlag = false;
    }
	toggleClass() {
		const {active} = this.state;
        this.setState({ active: !active});
    };
	
	showAddFunc(e) {
		e.stopPropagation();
		this.setState({showAddFunc: true});
	}
	
	inputFocus(e) {
		e.stopPropagation();
	}
	
	addScorePoints(e) {
		e.stopPropagation();
		const input = this.inputRef.current;
		if(input.value !== '') {
			this.setState({points: this.props.card.scores += parseFloat(input.value), inputFlag: false});
			this.setState({inputFlag: false, showAddFunc: false});
		} else {
			alert('You are not going to add some score to ' + this.props.card.name + '.. :-( Are you?');
		}
		
	}
	
	hideScorePointsBlock(e) {
		e.stopPropagation();
		this.setState({showAddFunc: false, inputFlag: false});
	}
	
	handleChange(e) {
		const re = /^[0-9\b]+$/;
		if(e.target.value === '' || re.test(e.target.value)) {
			this.setState({inputFlag: true, points: e.target.value});
		}		
	};
	
render () {
	let boxClass = ["card"];
		if(this.state.active) {
		  boxClass.push('active');
		}
	const { card } = this.props;
	return (
	<div className={boxClass.join(' ')} key={card.id} onClick={this.toggleClass}>
		<div className="card-body">
			<h5 className="card-title">{card.name}</h5>
			<h6 className="card-subtitle mb-2 text-muted">{card.email}</h6>
			<p className="card-text">{card.company.catchPhrase}</p>
			<span className="score-points">{card.scores}</span>
				
				
			<div className="add-scorepoints">
				<button className={this.state.showAddFunc ? 'add-score-button hide' : 'add-score-button'} onClick={this.showAddFunc}><span>Add more scores</span> <MdAdd /></button>
				<div className={this.state.showAddFunc ? 'add-scorepoints-block show' : 'add-scorepoints-block hide'}>
					<div className="input-container">
						<input type="text" value={this.state.inputFlag ? this.state.points : ''} ref={this.inputRef} onClick={this.inputFocus} onChange={this.handleChange} />
					</div>
					<div className="buttons-container">					
						<button className="confirm-button" onClick={this.addScorePoints}><MdDone /></button>
						<button className="decline-button" onClick={this.hideScorePointsBlock}><MdClose /></button>
					</div>	
				</div>
			</div>	
		  </div>
		  </div>
	)
	}
}
export default Card