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
    // can't do actions while in these states
    if ([ 'SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING' ].includes(this.current)) {
      // do nothing
      return;
    }

    if (this.current === 'INIT' || this.current === 'DEAD') {
      this.startGame();
      return;
    }

    // execute the currently selected action
    switch (icon) {
      case 'weather':
        this.changeWeather();
        break;
      case 'poop':
        this.cleanUpPoop();
        break;
      case 'fish':
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log('changeWeather');
  },
  cleanUpPoop() {
    console.log('cleanUpPoop');
  },
  feed() {
    console.log('feed');
  }
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
