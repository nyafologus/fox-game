/* eslint-disable no-console */
import { SCENES, RAIN_CHANCE, DAY_LENGTH, NIGHT_LENGTH, getNextHungerTime, getNextDieTime } from './constants';
import { modFox, modScene } from './ui';

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
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,

  tick() {
    // increment current time
    this.clock++;
    console.log('clock', this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    }

    return this.clock;
  },

  startGame() {
    console.log('hatching');
    // move finite state machine from INIT to HATCHING
    this.current = 'HATCHING';
    // define wake up time
    this.wakeTime = this.clock + 3;
    modFox('egg');
    modScene('day');
  },

  wake() {
    console.log('hatched');
    this.current = 'IDLING';
    this.wakeTime = -1;
    modFox('idling');
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },

  sleep() {
    this.state = 'SLEEP';
    modFox('sleep');
    modScene('night');
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },

  getHungry() {
    this.current = 'HUNGRY';
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox('hungry');
  },

  die() {
    console.log('die');
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

export default gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
