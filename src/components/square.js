import React from 'react'

class Square extends React.Component {

  getDisplay = (odd) => {
    if(typeof(odd) === "undefined") return "";
    return !!odd ? "O" : "X";
  }

  handleClick = () => {
    this.props.handler(this.props.x,this.props.y);
  };

  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        {this.getDisplay(this.props.odd)}
      </button>
    );
  };
}

export default Square
