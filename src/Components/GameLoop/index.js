import {SizeMetrics} from '../../Constants';

const GameLoop = (entities, {touches, dispatch, events}) => {
  let head = entities.head;

  head.nextMove -= 1;

  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;

    if (
      head.position[0] + head.xspeed < 0 ||
      head.position[0] + head.xspeed >= SizeMetrics.GRID_SIZE ||
      head.position[1] + head.yspeed < 0 ||
      head.position[1] + head.yspeed >= SizeMetrics.GRID_SIZE
    ) {
      // game over
    } else {
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;
    }
  }

  return entities;
};

export default GameLoop;
