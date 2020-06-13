parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNextPoopTime=exports.getNextDieTime=exports.getNextHungerTime=exports.NIGHT_LENGTH=exports.DAY_LENGTH=exports.RAIN_CHANCE=exports.SCENES=exports.TICK_RATE=exports.ICONS=void 0;const e=["fish","poop","weather"];exports.ICONS=e;const t=3e3;exports.TICK_RATE=3e3;const o=["day","rain"];exports.SCENES=o;const r=.2;exports.RAIN_CHANCE=.2;const s=60;exports.DAY_LENGTH=60;const x=3;exports.NIGHT_LENGTH=3;const p=e=>Math.floor(3*Math.random())+5+e;exports.getNextHungerTime=p;const N=e=>Math.floor(2*Math.random())+3+e;exports.getNextDieTime=N;const n=e=>Math.floor(3*Math.random())+4+e;exports.getNextPoopTime=n;
},{}],"lA8h":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.writeModal=exports.togglePoopBag=exports.modScene=exports.modFox=void 0;const o=function(o){document.querySelector(".fox").className="fox fox-".concat(o)};exports.modFox=o;const e=function(o){document.querySelector(".game").className="game ".concat(o)};exports.modScene=e;const t=function(o){document.querySelector(".poop-bag").classList.toggle("hidden",!o)};exports.togglePoopBag=t;const c=function(){let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";document.querySelector(".modal").innerHTML='<div class="modal-inner">'.concat(o,"</div>")};exports.writeModal=c;
},{}],"Oo4C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleUserAction=exports.default=void 0;var e=require("./constants"),t=require("./ui");const i={current:"INIT",clock:1,wakeTime:-1,sleepTime:-1,hungryTime:-1,dieTime:-1,timeToStartCelebrating:-1,timeToEndCelebrating:-1,poopTime:-1,tick(){return this.clock++,console.log("clock",this.clock),this.clock===this.wakeTime?this.wake():this.clock===this.sleepTime?this.sleep():this.clock===this.hungryTime?this.getHungry():this.clock===this.dieTime?this.die():this.clock===this.timeToStartCelebrating?this.startCelebrating():this.clock===this.timeToEndCelebrating?this.endCelebrating():this.clock===this.poopTime&&this.poop(),this.clock},startGame(){console.log("hatching"),this.current="HATCHING",this.wakeTime=this.clock+3,(0,t.modFox)("egg"),(0,t.modScene)("day"),(0,t.writeModal)()},wake(){console.log("hatched"),this.current="IDLING",this.wakeTime=-1,(0,t.modFox)("idling"),this.scene=Math.random()>e.RAIN_CHANCE?0:1,(0,t.modScene)(e.SCENES[this.scene]),this.sleepTime=this.clock+e.DAY_LENGTH,this.hungryTime=(0,e.getNextHungerTime)(this.clock),this.determineFoxState()},sleep(){this.state="SLEEP",(0,t.modFox)("sleep"),(0,t.modScene)("night"),this.clearTimes(),this.wakeTime=this.clock+e.NIGHT_LENGTH},getHungry(){this.current="HUNGRY",this.dieTime=(0,e.getNextDieTime)(this.clock),this.hungryTime=-1,(0,t.modFox)("hungry")},die(){console.log("die"),this.current="DEAD",(0,t.modScene)("dead"),(0,t.modFox)("dead"),this.clearTimes(),(0,t.writeModal)("The fox died :( <br/> Press the middle button to start")},handleUserAction(e){if(!["SLEEP","FEEDING","CELEBRATING","HATCHING"].includes(this.current))if("INIT"!==this.current&&"DEAD"!==this.current)switch(e){case"weather":this.changeWeather();break;case"poop":this.cleanUpPoop();break;case"fish":this.feed()}else this.startGame()},changeWeather(){console.log("changeWeather"),this.scene=(1+this.scene)%e.SCENES.length,(0,t.modScene)(e.SCENES[this.scene]),this.determineFoxState()},poop(){this.current="POOPING",this.poopTime=-1,this.dieTime=(0,e.getNextDieTime)(this.clock),(0,t.modFox)("pooping")},cleanUpPoop(){console.log("cleanUpPoop"),"POOPING"===this.current&&(this.dieTime=-1,(0,t.togglePoopBag)(!0),this.startCelebrating(),this.hungryTime=(0,e.getNextHungerTime)(this.clock))},feed(){console.log("feed"),"HUNGRY"===this.current&&(this.current="FEEDING",this.dieTime=-1,this.poopTime=(0,e.getNextPoopTime)(this.clock),(0,t.modFox)("eating"),this.timeToStartCelebrating=this.clock+2)},startCelebrating(){this.current="CELEBRATING",(0,t.modFox)("celebrate"),this.timeToStartCelebrating=-1,this.timeToEndCelebrating=this.clock+2},endCelebrating(){this.timeToEndCelebrating=-1,this.current="IDLING",this.determineFoxState(),(0,t.togglePoopBag)(!1)},determineFoxState(){"IDLING"===this.current&&("rain"===e.SCENES[this.scene]?(0,t.modFox)("rain"):(0,t.modFox)("idling"))},clearTimes(){this.wakeTime=-1,this.sleepTime=-1,this.hungryTime=-1,this.dieTime=-1,this.poopTime=-1,this.timeToStartCelebrating=-1,this.timeToEndCelebrating=-1}};var s=i;exports.default=s;const o=i.handleUserAction.bind(i);exports.handleUserAction=o;
},{"./constants":"iJA9","./ui":"lA8h"}],"Vgpl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var t=require("./constants.js");const e=(e,n)=>document.querySelector(".".concat(t.ICONS[e],"-icon")).classList.toggle("highlighted",n);function n(n){let s=0;document.querySelector(".buttons").addEventListener("click",function(c){let{target:o}=c;o.classList.contains("left-btn")?(e(s,!1),s=(2+s)%t.ICONS.length,e(s,!0)):o.classList.contains("right-btn")?(e(s,!1),s=(1+s)%t.ICONS.length,e(s,!0)):n(t.ICONS[s])})}
},{"./constants.js":"iJA9"}],"FyzG":[function(require,module,exports) {
"use strict";var e=u(require("./gameState")),t=n(require("./buttons")),r=require("./constants");function n(e){return e&&e.__esModule?e:{default:e}}function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=n?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(r,u,a):r[u]=e[u]}return r.default=e,t&&t.set(e,r),r}async function a(){console.log("starting game"),(0,t.default)(e.handleUserAction);let n=Date.now();!function t(){const o=Date.now();n<=o&&(e.default.tick(),n=o+r.TICK_RATE),requestAnimationFrame(t)}()}a();
},{"./gameState":"Oo4C","./buttons":"Vgpl","./constants":"iJA9"}]},{},["FyzG"], null)
//# sourceMappingURL=fox-game/init.56aaf0ff.js.map