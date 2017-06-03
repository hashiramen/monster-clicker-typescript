import Player from '../Models/Player'
import Monster from '../Models/Monster'
import UI from '../Models/Ui'
import { monster } from '../LittleComponents/components'

export default class Battle implements Actions{
    player: Player
    monster: Monster
    ui: UI
    listener: boolean = false
    constructor(player: Player, monster: Monster, ui: UI){
        this.player = player
        this.monster = monster
        this.ui = ui
        this.setListener()
        this.monsterIdleCombat()
    }

    setListener(): void{
        this.listener = true
        if(this.listener)
            monster.addEventListener('click', () => this.click(), false)
    }   

    click(): void{
        this.playerDealDmg()
        this.generateNewMonster(!this.checkIfMonsterIsNotDead())
        this.ui.setStage(this.monster.stage)
        console.log(`Your silver: ${this.player.silver}`)
    }

    playerDealDmg(): void{
        const dmg: number = this.playerDmgCalculation()
        this.monster.currentHp += -dmg
        this.ui.pushDmgNotificationPlayer(this.player, dmg)
        this.ui.setMonsterHp(this.monster)
    }
    playerDmgCalculation(): number{
        return this.player.dmg * this.player.upgrades[0].level
    }
    playerDefenseCalculation(): number{
        return this.player.defense * this.player.upgrades[1].level
    }
    monsterDealDmg(): void{
        const dmg: number = this.monster.dmg - this.playerDefenseCalculation()
        this.player.currentHp += dmg < 0 ? 0 : -dmg
        this.ui.pushDmgNotificationMonster(this.monster, dmg)
        this.ui.setPlayerHp(this.player)
    }

    //generate new monster depending on the situation
    generateNewMonster(b: boolean): void {
        if(b){
            this.monster = new Monster(this.monster.stage + 1)
            this.ui.setMonsterHp(this.monster)
        }
    }

    //monster will deal some dmg every 3 seconds, as long as it is not first stage
    monsterIdleCombat(): void{
        setInterval(() => {
            if(this.monster.stage !== 1)
            {
                this.monsterDealDmg()
                this.respawnPlayer(this.checkIfPlayerIsNotDead())
                this.ui.setStage(this.monster.stage)
            }
        }, 2000)
    }

    checkIfPlayerIsNotDead(): boolean{
        if(this.player.currentHp > 0)
            return true
        else
            return false
    }

    checkIfMonsterIsNotDead(): boolean{
        if(this.monster.currentHp > 0)
        {
            return true
        }
        else
        {
            this.result()
            return false
        }
    }

    respawnPlayer(b: boolean): void{
        if(!b){
            this.player.currentHp = this.player.maxHp
            this.ui.setPlayerHp(this.player)
            this.monster = new Monster()
            this.ui.setMonsterHp(this.monster)
            console.log('player respawned')
        }
    }

    result(): void{       
        this.player.silver += this.monster.silver
        this.ui.setSilver(this.player.silver)
    }    
}

interface Actions{
    setListener(): void
    click(): void
    playerDealDmg(): void
    monsterDealDmg(): void
    result(): void
    generateNewMonster(b: boolean): void
    monsterIdleCombat(): void
    checkIfPlayerIsNotDead(): boolean
    checkIfMonsterIsNotDead(): boolean
    respawnPlayer(b: boolean): void
}