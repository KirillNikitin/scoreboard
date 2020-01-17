import React, { Component } from 'react';
import Contacts from './components/contacts';
import { IoMdPersonAdd } from 'react-icons/io';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      player: '',
      scores: ''
      } 
      
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  
  
    handleAdd(e) {
      const value = e.target.value;
      this.setState({[e.target.name] : value})
    }
    
    handleSubmit(e) {
    e.preventDefault();
    if (this.state.player !== '' && this.state.scores !== '') {
      alert('Added Name: ' + this.state.player + ' Added Scores: ' + this.state.scores);      
      this.state.contacts.push({
        id: this.state.contacts.length + 1, 
        name: this.state.player,
        email: this.state.player + '@newgame.mail',
        company: {
          name: 'NewGame Ltd.', 
          catchPhrase: this.state.player + ' joined: ' 
            + String(new Date().getMonth() + 1).padStart(2, '0') + '/' 
            + String(new Date().getDate()).padStart(2, '0') + '/' 
            + new Date().getFullYear() + ' - ' 
            + new Date().getHours() + ':' 
            + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) }, 
        scores: parseFloat(this.state.scores)})
      this.setState({ contacts : this.state.contacts, player: '', scores: ''});
    } else {
      if(this.state.player === '' && this.state.scores !== '') {
        alert('What about the name?.. - "Noname" player? :-O');
      } else if(this.state.player !== '' && this.state.scores === '') {
        alert('It is not so suitable for ' + this.state.player + ' to start without any points, you know...')
      } else {
        alert('It is hard to be a player without any name and scorepoints.. :-(');
      }     
    }   
    }
    
    fillScoreList(ar) {
    ar.forEach(function (obj) {
      obj.scores = Math.round(Math.random()*1000);
    });  
    }
    
    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
      this.fillScoreList(data);
          this.setState({ contacts: data }); 
      console.log(data)
      
        })
        .catch(console.log)
      }   
    
      render() {
        return (
      <div>
        <Contacts contacts={this.state.contacts} />
        
        <form onSubmit={this.handleSubmit} className="submit-form">
        <label>
          Name
          <input type="text" name="player" value={this.state.player} onChange={this.handleAdd} />
        </label>
        <label>
          Scores
          <input type="number" name="scores" value={this.state.scores} onChange={this.handleAdd} />
        </label>
        <button type="submit" className="addplayer-button" value="Add" > Add player <IoMdPersonAdd/> </button>
        </form>
      </div>  
        );
      }
    }

export default App;