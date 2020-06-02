/* eslint-disable no-console */
import game from './gameState';
import initButtons from './buttons';

// 3000 ms
// screaming case implies the value never changes
import { TICK_RATE } from './constants';

async function init() {
  console.log('starting game');
  initButtons(game.handleUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
