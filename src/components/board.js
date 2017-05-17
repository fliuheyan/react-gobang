import React from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import Square from './square'

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  odd = true;

  clickHandler = () => {
    this.odd = !this.odd;
    return this.odd;
  }

  getSquare = (x,y) => {
    return <Square x={x} y={y} handler={this.clickHandler}/>;
  };

  render() {

    return (
        <div>
          <div className="row">
            {
              _.range(this.props.range).map(x => _.range(this.props.range).map(y => {return this.getSquare(x,y)}))
            }
          </div>
        </div>
    )
  }
}

export default Board
