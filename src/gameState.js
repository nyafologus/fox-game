/* eslint-disable no-console */

// handles business logic (the clock, the state machine, all the actual logic behind the game)
const gameState = {
  current: 'INIT',
  // keep track of what clock tick we are currently on
  clock: 1,
  // -1 is not here to do any opereations on the clock value
  // -1 serves as a sentinel to indicate the state of being "not currently active"
  // it could be denoted with undefined instead of -1
  // it is -1 so it is the same type as the clock value
  wakeTime: -1,
  tick() {
    // increment current time
    this.clock++;
    console.log('clock', this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    }

    return this.clock;
  },
  startGame() {
    console.log('hatching');
    // move finite state machine from INIT to HATCHING
    this.current = 'HATCHING';
    // define wake up time
    this.wakeTime = this.clock + 3;
  },

  wake() {
    console.log('hatched');
    this.current = 'IDLING';
    this.wakeTime = -1;
  },

  handleUserAction(icon) {
    console.log(icon);
  }
};

export default gameState;
