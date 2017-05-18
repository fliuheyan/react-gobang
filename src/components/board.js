import React from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import Square from './square'
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
    if(typeof(map[x][y]) != "undefined") return;
    const odd = !this.state.odd;
    map[x][y] = odd;
    this.setState({odd: odd, map: map});
    this.checkSuccess(x,y);
  };

  checkSuccess = (x,y) => {
    const that = this;
    function Position(x,y){
      this.x = x;
      this.y = y;
      this.move = (position,partial) => {
        const step = partial || 1;
        const horizon = this.x + position.x * step;
        const vertical = this.y + position.y * step;
        return [horizon,vertical]
      };
      this.isValid = (position,step) => {
        const new_position = this.move(position,step);
        const range = that.props.range;
        return (0 < new_position[0] && new_position[0] < range) && (0 < new_position[1] && new_position[0] < range);
      };
      this.content = () => {
        return that.state.map[this.x][this.y]
      };
      this.neighbour = (position,step) => {
        if(!this.isValid(position,step)) return undefined
        const new_position = this.move(position,step);
        return that.state.map[new_position[0]][new_position[1]];
      };
    }
    const directions = [
      [new Position(-1,0),new Position(1,0)],
      [new Position(0,1),new Position(0,-1)],
      [new Position(-1,1),new Position(1,-1)],
      [new Position(-1,-1),new Position(1,1)]
    ];

    function countSameContent(current,position) {
      var count = 0;
      debugger;
      while(typeof(current.neighbour(position,count+1)) != "undefined" && current.content() === current.neighbour(position,count+1)){
        debugger;
        count++;
      }
      return count;
    };

    const current = new Position(x,y);
    directions.forEach(tuple => {
      debugger;
      var count = countSameContent(current,tuple[0]) + countSameContent(current,tuple[1]);
      if(count === 4) {
        alert("your win");
      }
    });
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
