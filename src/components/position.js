import _ from 'lodash';

const Position = function Position(x,y,range){
  this.x = x;
  this.y = y;
  function Offset(x,y) {
    const that = this;
    that.x = x;
    that.y = y;
    this.offset = (position,step) => {
      const newStep = step || 1;
      const horizon = this.x + position.x * newStep;
      const vertical = this.y + position.y * newStep;
      return [horizon,vertical]
    };
  }
  this.range = range;

  this.isValid = (position,step) => {
    const offsetPosition = this.offset(position,step);
    return (0 < offsetPosition[0] && offsetPosition[0] < this.range)
      && (0 < offsetPosition[1] && offsetPosition[0] < this.range);
  };
  this.content = (map) => {
    return map[this.x][this.y]
  };
  this.offsetContent = (position,step,map) => {
    if(!this.isValid(position,step)) return undefined
    const offset = this.offset(position,step);
    return map[offset[0]][offset[1]];
  };
  this.countSublings = (position,map) =>{
    var count = 0;
    for(var step = count+1;typeof(this.offsetContent(position,step,map)) !== "undefined" && this.content(map) === this.offsetContent(position,step,map);){
      count++;
      step++;
    }
    return count;
  };
  this.isWin = (map) => {
    const that = this;
    const directions = [
      [new Offset(-1,0),new Offset(1,0)],
      [new Offset(0,1),new Offset(0,-1)],
      [new Offset(-1,1),new Offset(1,-1)],
      [new Offset(-1,-1),new Offset(1,1)]
    ];

    return _.some(directions, tuple => {
      var count = _.reduce(tuple,function(sum,each){
        return sum + that.countSublings(each,map);
      },0);
      return count === 4;
    });
  };
  return {
    isWin: this.isWin
  }
};

export default Position;
