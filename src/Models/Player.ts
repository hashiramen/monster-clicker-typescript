import Base from './BaseStats'
import Upgrade from './Upgrade'

class Player extends Base{
    upgrades: Upgrade[]
    constructor(name: string, upgrades: Upgrade[]) {
        super()
        this.upgrades = upgrades
        this.name = name
        this.maxHp = 10 * this.upgrades[2].level
        this.currentHp = this.maxHp
        this.dmg = 2
        this.defense = 1 * this.upgrades[1].level
        this.silver = 0
    }

    add(silver: number){
        this.silver += silver
        console.log('Current currency: ' + this.silver)
    }    
}

export default Player
