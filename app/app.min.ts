/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseStats__ = __webpack_require__(2);

class Monster extends __WEBPACK_IMPORTED_MODULE_0__BaseStats__["a" /* default */] {
    constructor(stage = 1) {
        super();
        this.maxHp = stage * 3;
        this.currentHp = this.maxHp;
        this.stage = stage;
        this.dmg = 1 * this.stage;
        this.silver = 1 * this.stage;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Monster);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export upgradesLI */
const nick = document.getElementById('nick');
/* harmony export (immutable) */ __webpack_exports__["b"] = nick;

const silver = document.getElementById('silver');
/* harmony export (immutable) */ __webpack_exports__["d"] = silver;

const monster = document.getElementById('monster');
/* harmony export (immutable) */ __webpack_exports__["a"] = monster;

const notification = document.getElementById('notification');
/* harmony export (immutable) */ __webpack_exports__["g"] = notification;

const notificationPlayer = document.getElementById('notification-player');
/* harmony export (immutable) */ __webpack_exports__["h"] = notificationPlayer;

const upgradesUl = document.getElementById('upgrades-list');
/* harmony export (immutable) */ __webpack_exports__["f"] = upgradesUl;

let upgradesLI = document.querySelectorAll('.upgrade-element');
const globalNotifications = document.getElementById('global-notif');
/* harmony export (immutable) */ __webpack_exports__["i"] = globalNotifications;

const playerStatus = document.getElementById('p-status');
/* harmony export (immutable) */ __webpack_exports__["c"] = playerStatus;

const stage = document.getElementById('stage');
/* harmony export (immutable) */ __webpack_exports__["e"] = stage;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Base {
}
/* harmony default export */ __webpack_exports__["a"] = (Base);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Models_Monster__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LittleComponents_components__ = __webpack_require__(1);


class Battle {
    constructor(player, monster, ui) {
        this.listener = false;
        this.player = player;
        this.monster = monster;
        this.ui = ui;
        this.setListener();
        this.monsterIdleCombat();
    }
    setListener() {
        this.listener = true;
        if (this.listener)
            __WEBPACK_IMPORTED_MODULE_1__LittleComponents_components__["a" /* monster */].addEventListener('click', () => this.click(), false);
    }
    click() {
        this.playerDealDmg();
        this.generateNewMonster(!this.checkIfMonsterIsNotDead());
        this.ui.setStage(this.monster.stage);
        console.log(`Your silver: ${this.player.silver}`);
    }
    playerDealDmg() {
        const dmg = this.playerDmgCalculation();
        this.monster.currentHp += -dmg;
        this.ui.pushDmgNotificationPlayer(this.player, dmg);
        this.ui.setMonsterHp(this.monster);
    }
    playerDmgCalculation() {
        return this.player.dmg * this.player.upgrades[0].level;
    }
    playerDefenseCalculation() {
        return this.player.defense * this.player.upgrades[1].level;
    }
    monsterDealDmg() {
        const dmg = this.monster.dmg - this.playerDefenseCalculation();
        this.player.currentHp += dmg < 0 ? 0 : -dmg;
        this.ui.pushDmgNotificationMonster(this.monster, dmg);
        this.ui.setPlayerHp(this.player);
    }
    //generate new monster depending on the situation
    generateNewMonster(b) {
        if (b) {
            this.monster = new __WEBPACK_IMPORTED_MODULE_0__Models_Monster__["a" /* default */](this.monster.stage + 1);
            this.ui.setMonsterHp(this.monster);
        }
    }
    //monster will deal some dmg every 3 seconds, as long as it is not first stage
    monsterIdleCombat() {
        setInterval(() => {
            if (this.monster.stage !== 1) {
                this.monsterDealDmg();
                this.respawnPlayer(this.checkIfPlayerIsNotDead());
                this.ui.setStage(this.monster.stage);
            }
        }, 2000);
    }
    checkIfPlayerIsNotDead() {
        if (this.player.currentHp > 0)
            return true;
        else
            return false;
    }
    checkIfMonsterIsNotDead() {
        if (this.monster.currentHp > 0) {
            return true;
        }
        else {
            this.result();
            return false;
        }
    }
    respawnPlayer(b) {
        if (!b) {
            this.player.currentHp = this.player.maxHp;
            this.ui.setPlayerHp(this.player);
            this.monster = new __WEBPACK_IMPORTED_MODULE_0__Models_Monster__["a" /* default */]();
            this.ui.setMonsterHp(this.monster);
            console.log('player respawned');
        }
    }
    result() {
        this.player.silver += this.monster.silver;
        this.ui.setSilver(this.player.silver);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Battle;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseStats__ = __webpack_require__(2);

class Player extends __WEBPACK_IMPORTED_MODULE_0__BaseStats__["a" /* default */] {
    constructor(name, upgrades) {
        super();
        this.upgrades = upgrades;
        this.name = name;
        this.maxHp = 10 * this.upgrades[2].level;
        this.currentHp = this.maxHp;
        this.dmg = 2;
        this.defense = 1 * this.upgrades[1].level;
        this.silver = 0;
    }
    add(silver) {
        this.silver += silver;
        console.log('Current currency: ' + this.silver);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Combat_HandleUpgrades__ = __webpack_require__(7);


class UI {
    constructor(player, monster) {
        this.dmgNotificationDuration = 500;
        this.globalNotificationDuration = 2000;
        this.player = player;
        this.loaded = true;
        this.upgrades = player.upgrades;
        this.setNick(player.name);
        this.setPlayerHp(player);
        this.setSilver(player.silver);
        this.setMonsterHp(monster);
        this.setInitialUpgradeList();
    }
    setNick(nick) {
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["b" /* nick */].innerHTML = nick;
    }
    setPlayerHp(player) {
        // cmpnt.playerStatus.children[0].value = player.currentHp.toString()
        // cmpnt.playerStatus.children[0].max = player.maxHp.toString()
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["c" /* playerStatus */].children[0].firstElementChild.innerHTML = player.currentHp.toString();
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["c" /* playerStatus */].children[0].lastElementChild.innerHTML = player.maxHp.toString();
    }
    setSilver(silver) {
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["d" /* silver */].innerHTML = silver.toString();
    }
    setStage(stage) {
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["e" /* stage */].innerHTML = `Stage: ${stage}`;
    }
    setMonsterName(monster) {
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["a" /* monster */].children[0].firstElementChild.innerHTML = monster.name;
    }
    setMonsterHp(monster) {
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["a" /* monster */].children[1].firstElementChild.innerHTML = monster.currentHp.toString();
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["a" /* monster */].children[1].lastElementChild.innerHTML = monster.maxHp.toString();
    }
    setInitialUpgradeList() {
        this.clearUpgradeList();
        this.upgrades.map(up => __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["f" /* upgradesUl */].appendChild(this.li(up.level, up.name)));
        this.upgradesListener();
    }
    clearUpgradeList() {
        while (__WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["f" /* upgradesUl */].firstChild) {
            __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["f" /* upgradesUl */].removeChild(__WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["f" /* upgradesUl */].firstChild);
        }
    }
    upgradesListener() {
        const lis = document.querySelectorAll('.upgrade-element');
        lis.forEach(li => li.addEventListener('click', () => {
            const upgrade = new __WEBPACK_IMPORTED_MODULE_1__Combat_HandleUpgrades__["a" /* default */](li.dataset.name, this.player, this);
            upgrade.handle();
        }));
    }
    pushDmgNotificationPlayer(player, dmg) {
        const spread = 200;
        const notif = document.createElement('p');
        notif.textContent = `${dmg}`;
        notif.classList.add('notif');
        notif.style.top = `${(Math.floor(Math.random() * spread)).toString()}px`;
        notif.style.left = `${(Math.floor(Math.random() * spread)).toString()}px`;
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["g" /* notification */].appendChild(notif);
        setTimeout(() => __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["g" /* notification */].removeChild(notif), this.dmgNotificationDuration);
    }
    pushDmgNotificationMonster(monster, dmg) {
        const spread = 50;
        const notif = document.createElement('p');
        notif.textContent = `${dmg}`;
        notif.classList.add('notif-p');
        notif.style.top = `${(Math.floor(Math.random() * spread)).toString()}px`;
        notif.style.left = `${(Math.floor(Math.random() * spread)).toString()}px`;
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["h" /* notificationPlayer */].appendChild(notif);
        setTimeout(() => __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["h" /* notificationPlayer */].removeChild(notif), this.dmgNotificationDuration);
    }
    pushUpgradeNotification(upgrade, player, success) {
        let text;
        switch (success) {
            case true:
                text = `You have successfuly upgrade '${upgrade.name}'`;
                break;
            case false:
                text = `You need ${upgrade.cost - player.silver} more silver to upgrade: '${upgrade.name}'`;
                break;
        }
        const pack = document.createElement('div');
        pack.classList.add('notgif-g');
        pack.style.left = '0';
        const spread = 50;
        const notif = document.createElement('p');
        notif.textContent = text;
        pack.appendChild(notif);
        __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["i" /* globalNotifications */].appendChild(pack);
        setTimeout(() => __WEBPACK_IMPORTED_MODULE_0__LittleComponents_components__["i" /* globalNotifications */].removeChild(pack), this.globalNotificationDuration);
    }
    li(level, name) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.value = 'upgrade';
        button.textContent = 'upgrade';
        button.classList.add('upgrade-element');
        button.dataset.name = name;
        const p = document.createElement('p');
        p.textContent = `Lv${level} - ${name}`;
        li.appendChild(p);
        li.appendChild(button);
        return li;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DataUpgrades = [{
        name: 'dmg',
        bonus: 2,
        level: 1,
        cost: 33
    },
    {
        name: 'defense',
        bonus: 2,
        level: 1,
        cost: 44
    },
    {
        name: 'hp',
        bonus: 4,
        level: 1,
        cost: 37
    }];
/* harmony export (immutable) */ __webpack_exports__["a"] = DataUpgrades;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HandleUpgrade {
    constructor(upName, player, ui) {
        this.ui = ui;
        this.current = upName;
        this.player = player;
        this.upgrade = this.player.upgrades.find((up) => up.name == this.current);
    }
    handle() {
        let success = false;
        switch (this.upgrade.name) {
            case 'hp':
                if (this.checkIfHasEnoughSilver()) {
                    this.upgrade.level += 1;
                    this.player.maxHp = 10 + this.upgrade.level * 2;
                    this.player.silver += -this.upgrade.cost;
                    this.upgrade.cost = this.upgrade.cost * 2;
                    this.ui.setPlayerHp(this.player);
                    success = true;
                }
                break;
            case 'dmg':
                if (this.checkIfHasEnoughSilver()) {
                    this.upgrade.level += 1;
                    this.player.silver += -this.upgrade.cost;
                    this.upgrade.cost = this.upgrade.cost * 2;
                    success = true;
                }
                break;
            case 'defense':
                if (this.checkIfHasEnoughSilver()) {
                    this.upgrade.level += 1;
                    this.player.silver += -this.upgrade.cost;
                    this.upgrade.cost = this.upgrade.cost * 2;
                    success = true;
                }
                break;
        }
        this.ui.setInitialUpgradeList();
        this.ui.setSilver(this.player.silver);
        this.ui.pushUpgradeNotification(this.upgrade, this.player, success);
    }
    checkIfHasEnoughSilver() {
        if (this.player.silver >= this.upgrade.cost)
            return true;
        else
            return false;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (HandleUpgrade);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Models_Player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Models_UI__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_Monster__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Combat_Battle__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_DataUpgrades__ = __webpack_require__(6);





//initial world creating
const initialUpgrades = __WEBPACK_IMPORTED_MODULE_4__data_DataUpgrades__["a" /* DataUpgrades */].map(item => item);
const player = new __WEBPACK_IMPORTED_MODULE_0__Models_Player__["a" /* default */]('Player', initialUpgrades);
const monster = new __WEBPACK_IMPORTED_MODULE_2__Models_Monster__["a" /* default */]();
const ui = new __WEBPACK_IMPORTED_MODULE_1__Models_UI__["a" /* default */](player, monster);
const fight = new __WEBPACK_IMPORTED_MODULE_3__Combat_Battle__["a" /* default */](player, monster, ui);


/***/ })
/******/ ]);