import {SizeMetrics} from '../../Constants';

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const GameLoop = (entities, {touches, dispatch, events}) => {
  let head = entities.head;
  let food = entities.food;
  let tail = entities.tail;

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === 'move-down' && head.yspeed != -1) {
        head.yspeed = 1;
        head.xspeed = 0;
      } else if (events[i].type === 'move-up' && head.yspeed != 1) {
        head.yspeed = -1;
        head.xspeed = 0;
      } else if (events[i].type === 'move-left' && head.xspeed != 1) {
        head.yspeed = 0;
        head.xspeed = -1;
      } else if (events[i].type === 'move-right' && head.xspeed != -1) {
        head.yspeed = 0;
        head.xspeed = 1;
      }
    }
  }

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
      dispatch({
        type: 'game-over',
      });
    } else {
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;
    }
  }

  if (
    head.position[0] === food.position[0] &&
    head.position[1] === food.position[1]
  ) {
    // eating Food
    tail.elements = [[food.position[0], food.position[1]]].concat(
      tail.elements,
    );

    food.position[0] = randomBetween(0, SizeMetrics.GRID_SIZE - 1);
    food.position[1] = randomBetween(0, SizeMetrics.GRID_SIZE - 1);
  }

  return entities;
};

export default GameLoop;
