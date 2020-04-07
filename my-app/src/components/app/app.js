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

  handleClick() {

    let inputArr = this.searchInput.value.split(' ');
    let newCanvas = this.state.canvas;    
    let command = inputArr[0];

    if ((command === "L" || command === "R" || command === "B") && !this.state.field) {
      alert('Create canvas first.');
      return;
    }
   
      let firstEl;
      let secondEl;
      let thirdEl;
      let bucketEl;
      let fourthEl;

      let inputLength = inputArr.length;
      if (inputLength >=3 && inputLength <= 5) {
        firstEl = +inputArr[1];
        secondEl = +inputArr[2]; 
        thirdEl = +inputArr[3];
        bucketEl = inputArr[3];
        fourthEl = +inputArr[4];
      }

      ////////////////// handleClick FUNCTIONS //////////////////    

      const line = (one, two, three, x, arr) => {

        let count = Math.abs(arr[one] - arr[two]);
        let i = +(arr[one]);
        let elemOne = +(arr[1]);
        let elemTwo = +(arr[2]);

        while (count + 1) {
          if (+arr[one] > +arr[two]) {
            three === 1 ? x[i][elemOne] = "x" : x[elemTwo][i] = "x";
            i-=1;
            count -= 1;
          }
          else if (+arr[one] < +arr[two]) {
            three === 1 ? x[i][elemOne] = "x" : x[elemTwo][i] = "x";
            i+=1;
            count -= 1;
          }
        }
        this.setState({
          canvas: x
        });
      }

      const paint = (f, someCanvas, someArr) => {
        if (someArr[1] === someArr[3] && someArr[2] !== someArr[4]) {
          f(2, 4, 1, someCanvas, someArr)
        }
        else if (someArr[2] === someArr[4] && someArr[1] !== someArr[3]) {
          f(1, 3, 2, someCanvas, someArr)
        }
        else {
          alert("This is not a line.")
        }
      }

      const booleanF = (...args) => {
        
        let booleanReturn = true;

          for (let i = 0; i < args.length; i++) {
            if (typeof args[i] !== "number") {
              booleanReturn = false;
              break;
            }
            else if (Number.isNaN(args[i]) ) {
              booleanReturn = false;
              break;
            } 
          }
        return booleanReturn;  
      }

      let firstCell = true;

      const bucket = (newValue, arr, x, y, el) => {
        let elem = el;
        if (firstCell && arr[y][x] === bucketEl) {
          return;
        }
        else {
          firstCell = false;
        }
        const dot = (x, y) => {
          if (arr[y][x] === newValue && x > 0 && x <= newCanvas[0].length - 2 && y > 0 && y <= newCanvas.length - 2) {
            arr[y][x] = el;
            this.setState({
              canvas: arr
            });
            return true;
          }
          else {           
            return false;
          }
        }
        dot(x, y);          
          if (dot(x, y - 1)) { bucket(newValue, newCanvas, x, y-1, elem) };      
          if (dot(x - 1, y)) { bucket(newValue, newCanvas, x-1, y, elem) };    
          if (dot(x + 1, y)) { bucket(newValue, newCanvas, x+1, y, elem) };
          if (dot(x, y + 1)) { bucket(newValue, newCanvas, x, y+1, elem) };       
        return;
      }

      //\\\\\\\\\\\\\\\\ handleClick FUNCTIONS \\\\\\\\\\\\\\\\\\

      ////////////////// COMMANDS ///////////////////////////////

      if (command === "C") {
        if (inputArr.length === 3 && booleanF(firstEl, secondEl) && firstEl > 0 && secondEl > 0 ) {
          let newArr = new Array(secondEl + 2);
          let newBorder = [];
          let ln = firstEl + 2;
          while (ln) {
            newBorder.push('-');
            ln -= 1;
          }
          
          let l = newArr.length;
          for (let i = 0; i < l; i++) {
            if (i === 0 || i === l -1) {
              newArr[i] = newBorder;
            } else {
              newArr[i] = [];
              let rowLenght = +(firstEl);
              while (rowLenght) {
                newArr[i].push(' ');
                rowLenght -= 1;
              }
              newArr[i].unshift("|");
              newArr[i].push("|");
            }
          }
          
          this.setState({
            canvas: newArr,
            field: true
        });
        }
        else {
          alert('Type ‘C number number’ for new canvas')
        }
      }
      else if (command === "L" && this.state.field === true) {
        if (
          inputArr.length === 5 && booleanF(firstEl, secondEl, thirdEl, fourthEl)   
        ) {
            if (0 > firstEl || firstEl > newCanvas[0].length - 2 || 0 > thirdEl
              || thirdEl > newCanvas[0].length - 2 || 0 > secondEl ||
              secondEl > newCanvas.length - 2 || 0 > fourthEl ||
              fourthEl > newCanvas.length - 2) {
              alert("Wrong size")
            }
            else if (firstEl !== thirdEl && secondEl !== fourthEl) {
              alert("Only straight lines allowed")
            }
            else {
              paint(line, newCanvas, inputArr)
            }
          }
      }
      else if (command === "R" && this.state.field === true && inputArr.length === 5 && booleanF(firstEl, secondEl, thirdEl, fourthEl)) {
        if (firstEl === thirdEl || secondEl === fourthEl) {
          alert("This is not a rectangle.")
        }
        else if (1 > firstEl || firstEl > newCanvas[0].length - 2 || 1 > thirdEl || thirdEl > newCanvas[0].length - 2 || 1 > secondEl || secondEl > newCanvas.length - 2 || 1 > fourthEl || fourthEl > newCanvas.length - 2) {
          alert("Wrong size")
        } else {
          let firstArr = [];
          firstArr.push(command); firstArr.push(firstEl, secondEl, thirdEl, secondEl);
          paint(line, newCanvas, firstArr);
          let secondArr = [];
          secondArr.push(command); secondArr.push(thirdEl, secondEl, thirdEl, fourthEl);
          paint(line, newCanvas, secondArr);
          let thirdArr = [];
          thirdArr.push(command); thirdArr.push(firstEl, fourthEl, fourthEl);
          paint(line, newCanvas, thirdArr);
          let fourthArr = [];
          fourthArr.push(command); fourthArr.push(firstEl, secondEl, firstEl, fourthEl);
          paint(line, newCanvas, fourthArr);
        }
      } 
      else if (command === "B" && this.state.field) {
        if (inputArr.length === 4 && booleanF(firstEl, secondEl)) { 
          let xValue = firstEl;
          let yValue = secondEl;
          if (xValue < 1 || xValue > newCanvas[0].length - 2 || yValue < 1 || yValue > newCanvas.length - 2) {
            alert ('Miss');
            return;
          }

          let symbol = bucketEl.split('').length;
          if (symbol > 1 || symbol < 0) {
            alert ("Only one symbol allowed!");
            return;
          }
          let newValue = newCanvas[secondEl][firstEl];
          
          bucket(newValue, newCanvas, firstEl, secondEl, bucketEl) 
        }
      }

      //\\\\\\\\\\\\\\\\ COMMANDS \\\\\\\\\\\\\\\\\\

  }

  render() {
    return (
      <div className="common-wrapp">
        <div className="search-wrapp">
          <div className="inputs-wrapp">
            <input type="text" className="search" placeholder={('Choose')} ref={(input) => { this.searchInput = input }} />
            <button type="button" className="input-button" onClick={() => this.handleClick()}>{('= Go =')}</button>       
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