import Base from './BaseStats'

class Monster extends Base{
    stage: number   
    constructor(stage: number = 1) {
        super()
        this.maxHp = stage * 3
        this.currentHp = this.maxHp
        this.stage = stage
        this.dmg = 1 * this.stage
        this.silver = 1 * this.stage
    }
}

export default Monster