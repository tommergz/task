import React from 'react';
import './app.css';
import Board from '../board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: [],
      field: false
    };
  }

  render() {
    return (
      <div className="common-wrapp">
        <div className="search-wrapp">
          <div className="inputs-wrapp">
            <input type="text" className="search" placeholder={('Choose')} ref={(input) => { this.searchInput = input }} />
            <button type="button" className="input-button">{('= Go =')}</button>       
          </div>
          <Board
            value = {this.state.canvas} 
          />
        </div>
      </div>
    );
  }
}

export default App;