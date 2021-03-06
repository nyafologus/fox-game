/* eslint-disable no-console */
import {
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime,
  getNextPoopTime
} from './constants';
import { modFox, modScene, togglePoopBag, writeModal } from './ui';

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
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  poopTime: -1,

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
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
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
    writeModal();
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
    this.determineFoxState();
  },

  sleep() {
    this.state = 'SLEEP';
    modFox('sleep');
    modScene('night');
    this.clearTimes();
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
    this.current = 'DEAD';
    modScene('dead');
    modFox('dead');
    this.clearTimes();
    writeModal('The fox died :( <br/> Press the middle button to start');
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
    this.scene = (1 + this.scene) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },

  poop() {
    this.current = 'POOPING';
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox('pooping');
  },

  cleanUpPoop() {
    console.log('cleanUpPoop');
    if (this.current === 'POOPING') {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  },

  feed() {
    console.log('feed');
    // can only feed when hungry
    if (this.current !== 'HUNGRY') {
      return;
    }

    this.current = 'FEEDING';
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox('eating');
    this.timeToStartCelebrating = this.clock + 2;
  },

  startCelebrating() {
    this.current = 'CELEBRATING';
    modFox('celebrate');
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = 'IDLING';
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === 'IDLING') {
      if (SCENES[this.scene] === 'rain') {
        modFox('rain');
      } else {
        modFox('idling');
      }
    }
  },

  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  }
};

export default gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
