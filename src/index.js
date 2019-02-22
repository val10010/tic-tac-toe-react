 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';

 const winnerCombination = ["012", "036", "048", "147", "246", "258", "345", "678"];

class Board extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     cells: Array(9).fill(null),
     currentMove: 'X',
     winner: '',
     start: 0,
   };

   this.getWinner = this.getWinner.bind(this);

 }


  addEventCells(index) {

    if(this.state.winner || !this.state.start) return;
    if(this.state.cells[index] !== null) return;

    let newCells = [...this.state.cells];
    newCells[index] = this.state.currentMove;
    
    let isWinner = (newCells.indexOf(null) !== -1  
      && !this.getWinner(newCells)) 
      ? false : this.getWinner(newCells);

    this.setState({
      cells: newCells,
      winner: isWinner,
      currentMove: this.state.currentMove === 'X' ? '0' : 'X',
    });

  }

  getWinner(arr){
    for(let combination of winnerCombination) {
      const [a,b,c] = [...combination];
      if( arr[a] !== null && arr[a] === arr[b] 
         && arr[b] === arr[c] ){
        return arr[a];
      }
    }
    return null;
  }

  addEventReset() {
    this.setState({
     cells: Array(9).fill(null),
     currentMove: 'X',
     winner: '',
    });
  }

  addEventStart() {
      this.setState({
        start: 1
      });
  }

  renderCells() {
    
    return (
      this.state.cells.map((cell,index) => 
        <div className="cell" key={index} onClick={() =>this.addEventCells(index)}>
          {cell}
        </div>
        )
    );
  }


  render() {

    return (
      <div className="wrapper">

        <div className="Board">
            {this.state.winner 
              ? <h3 className="title-result" >Winner: {this.state.winner} !!!</h3> : ''}
            {this.state.winner === null 
              ? <h3 className="title-result" >Draw</h3> : ''}
          <div className="square">
            {this.renderCells()}
          </div>
        </div>

        <div className="Board__bottom">
           {this.state.start 
           ? <h3>Next player: {this.state.currentMove}</h3> : ''}
           {this.state.start
           ? <div onClick={() => this.addEventReset()} className="btn__reset">RESET</div>
           : <div onClick={() => this.addEventStart()} className="btn__start" >Start!</div>
           }
        </div>

      </div>
    );
  }

}




ReactDOM.render(<Board />, document.getElementById("root"));