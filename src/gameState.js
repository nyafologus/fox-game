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
  startGame() {
    console.log('hatching');
    // move finite state machine from INIT to HATCHING
    this.current = 'HATCHING';
  },
  handleUserAction(icon) {
    console.log(icon);
  }
};

export default gameState;
