import React from 'react'

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: null
    }
  };

  getDisplay = (odd) => {
    return !!odd ? "O" : "X";
  }

  handleClick = () => {
    const odd = this.props.handler();
    this.setState({display: this.getDisplay(odd)})
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.display}
      </button>
    );
  }
}

export default Square
