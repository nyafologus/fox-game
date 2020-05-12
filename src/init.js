/* eslint-disable no-console */
import game from "./gameState";

// 3000 ms
// screaming case implies the value never changes
const TICK_RATE = 3000;

async function init() {
  console.log("starting game");

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
