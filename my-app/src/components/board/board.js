import React from 'react';
import './board.css';

class Board extends React.Component {
  render() {
    return (
      <div className="canvas-wrapp">
        {this.props.value.map((el, i) => {
          return <div className="element-wrapp" key={i}>
            { 
              el.map((el, i) => {
                return <span key={i+1}>{el}</span>
              })
            } 
          </div>                                                
        })}
      </div>
    )
  }
}   

export default Board;