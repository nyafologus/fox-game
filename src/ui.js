// modding the scene in order to be able to re-use functionality, for example:
// restarting the game after death / waking up after night

// modFox("egg");
// modFox("idling");
export const modFox = function modFox(state) {
  document.querySelector('.fox').className = `fox fox-${state}`;
};

// modScene("day");
export const modScene = function modScene(state) {
  document.querySelector('.game').className = `game ${state}`;
};

// togglePoopBag(false);
export const togglePoopBag = function togglePoopBag(show) {
  document.querySelector('.poop-bag').classList.toggle('hidden', !show);
};

export const writeModal = function writeModal(text = '') {
  document.querySelector('.modal').innerHTML = `<div class="modal-inner">${text}</div>`;
};
