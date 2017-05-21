import _ from 'lodash';

const Position = function Position(xx,yy,prange){
  const x = xx;
  const y = yy;
  const range = prange;

  function Offset(_xx,_yy) {
    const _x = _xx;
    const _y = _yy;

    const getPosition = (step) => {
      const newStep = step || 1;
      const horizon = x + _x * newStep;
      const vertical = y + _y * newStep;
      return [horizon,vertical]
    };
    const isValid = (step) => {
      const position = getPosition(step);
      return (0 < position[0] && position[0] < range)
        && (0 < position[1] && position[0] < range);
    };
    this.content = (step,map) => {
      if(!isValid(step)) return undefined
      const position = getPosition(step);
      return map[position[0]][position[1]];
    };
  }

  const content = (map) => {
    return map[x][y]
  };

  const countSublings = (offset,map) =>{
    var count = 0;
    for(var step = count+1;typeof(offset.content(step,map)) !== "undefined" && content(map) === offset.content(step,map);){
      count++;
      step++;
    }
    return count;
  };
  const isWin = (map) => {
    const directions = [
      [new Offset(-1,0),new Offset(1,0)],
      [new Offset(0,1),new Offset(0,-1)],
      [new Offset(-1,1),new Offset(1,-1)],
      [new Offset(-1,-1),new Offset(1,1)]
    ];

    return _.some(directions, tuple => {
      var count = _.reduce(tuple,function(sum,offset){
        return sum + countSublings(offset,map);
      },0);
      return count === 4;
    });
  };
  return {
    isWin: isWin
  }
};

export default Position;
