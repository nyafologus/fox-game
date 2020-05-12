/* eslint-disable no-console */
const gameState = {
  current: "INIT",
  // keep track of what clock tick we are currently on
  clock: 1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);
    return this.clock;
  },
};

export default gameState;
