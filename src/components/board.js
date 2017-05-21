import React from 'react'
import _ from 'lodash'
import Square from './square'
import Position from './position'
import './board.css'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      odd:false,
      map:this.create2dArray(this.props.range)
    }
  };

  create2dArray = (range) => {
    var array = new Array(range);
    for(var i=0;i<range;i++) {
      array[i] = new Array(range);
    }
    return array;
  };

  clickHandler = (x,y) => {
    var map = this.state.map;
    const range = this.props.range;
    if(typeof(map[x][y]) !== "undefined") return;
    const odd = !this.state.odd;
    map[x][y] = odd;
    this.setState({odd: odd, map: map});
    const position = new Position(x,y,range);
    if(position.isWin(map)) alert("you win!!!")
  };

  getSquare = (x,y) => {
    return <Square x={x} y={y} handler={this.clickHandler} odd={this.state.map[x][y]}/>;
  };

  render() {
    return (
        <div>
          <div className="row">
            {
              _.range(this.props.range).map(y => _.range(this.props.range).map(x => {return this.getSquare(x,y)}))
            }
          </div>
        </div>
    );
  };
}

export default Board
