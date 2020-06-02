/* eslint-disable no-console */

// handles business logic (the clock, the state machine, all the actual logic behind the game)
const gameState = {
  current: 'INIT',
  // keep track of what clock tick we are currently on
  clock: 1,
  tick() {
    this.clock++;
    console.log('clock', this.clock);
    return this.clock;
  },
  handleUserAction(icon) {
    console.log(icon);
  }
};

export default gameState;
