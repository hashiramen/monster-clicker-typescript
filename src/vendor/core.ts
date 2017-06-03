import Player from '../Models/Player'
import UI from '../Models/UI'

import Monster from '../Models/Monster'
import Battle from '../Combat/Battle'

import Upgrade from '../Models/Upgrade'
import { DataUpgrades } from '../data/DataUpgrades'

//initial world creating
const initialUpgrades: Upgrade[] = DataUpgrades.map(item => item)
const player: Player = new Player('Player', initialUpgrades)
const monster: Monster = new Monster()
const ui: UI = new UI(player, monster);
const fight: Battle = new Battle(player, monster, ui)

