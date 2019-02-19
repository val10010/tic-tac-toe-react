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
     moves: 0,
     start: 0,
   };

   this.addEventBtn = this.addEventBtn.bind(this);
   this.getWinner = this.getWinner.bind(this);
   this.addEventCells = this.addEventCells.bind(this);

 }


  addEventCells(event){
    if(this.state.winner) return;
    if(!this.state.start) return;

    let currentIndex = +event.target.dataset.index;
    let newCells = [...this.state.cells];
    newCells[currentIndex] = this.state.currentMove;

    if(this.state.cells[currentIndex] !== null) return;

    if(this.state.currentMove === 'X'){
      document.querySelector(`[data-index="${currentIndex}"]`).classList.remove('color__zero');
      this.setState({currentMove: '0'})
    }else{
      document.querySelector(`[data-index="${currentIndex}"]`).classList.add('color__zero');
      this.setState({currentMove: 'X'});
    }

    this.setState({
      cells: newCells,
    });

    this.setState({
      moves: this.state.moves + 1
    });

    this.getWinner(newCells);

  }

  getWinner(arr){
    for(let combination of winnerCombination) {
      const [a,b,c] = [...combination];
      if(arr[a] === arr[b] 
         && arr[b] === arr[c] ){
        this.setState({
          winner: arr[a]
        })
        return arr[a];
      }

    }
    return null;

  }

  addEventBtn(event) {
  let btn = event.target.dataset.elem;
  if(btn === 'start') {
    this.setState({
      start: 1
    });
  }

  if(btn === 'reset') {
    this.setState({
     cells: Array(9).fill(null),
     currentMove: 'X',
     winner: '',
     moves: 0,
    });
  }
  }

  renderCells() {
    return (
      this.state.cells.map((cell,i) => 
        <div className="cell" key={i} data-index={i} onClick={this.addEventCells}>
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
           {this.state.moves > 8 && this.state.winner == null 
          ? <h3 className="title-result" >Draw</h3> : ''}
          <div className="square">
            {this.renderCells()}
          </div>
        </div>

        <div className="Board__bottom">
           {this.state.moves !== 9 && this.state.winner == null 
           ? <h3>Next player: {this.state.currentMove}</h3> : ''}
           {this.state.start ? <div onClick={this.addEventBtn} data-elem="reset" className="btn__reset">RESET</div>
           : <div onClick={this.addEventBtn} data-elem="start"  className="btn__start" >Start!</div>
           }
        </div>

      </div>
    );
  }

}




ReactDOM.render(<Board />, document.getElementById("root"));