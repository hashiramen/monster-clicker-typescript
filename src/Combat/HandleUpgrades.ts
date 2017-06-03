import Upgrade from '../Models/Upgrade'
import Player from '../Models/Player'
import UI from '../Models/UI'
class HandleUpgrade implements UpgradeServices{
    current: string
    upgrade: Upgrade
    player: Player
    ui: UI
    constructor(upName: string, player: Player, ui: UI) {
        this.ui = ui
        this.current = upName
        this.player = player
        this.upgrade = this.player.upgrades.find((up) => up.name == this.current)
    }

    handle(): void{
        let success: boolean = false
        switch(this.upgrade.name)
        {
            case 'hp':
                if(this.checkIfHasEnoughSilver())
                {
                    this.upgrade.level += 1
                    this.player.maxHp = 10 + this.upgrade.level * 2
                    this.player.silver += -this.upgrade.cost
                    this.upgrade.cost = this.upgrade.cost *2
                    this.ui.setPlayerHp(this.player)
                    success = true;
                }
            break;
            case 'dmg':
                if(this.checkIfHasEnoughSilver())
                {
                    this.upgrade.level += 1
                    this.player.silver += -this.upgrade.cost
                    this.upgrade.cost = this.upgrade.cost *2
                    success = true;
                }
            break;
            case 'defense':
                if(this.checkIfHasEnoughSilver())
                {
                    this.upgrade.level += 1
                    this.player.silver += -this.upgrade.cost
                    this.upgrade.cost = this.upgrade.cost *2
                    success = true;
                }
            break;
        }
        
        this.ui.setInitialUpgradeList()
        this.ui.setSilver(this.player.silver)
        this.ui.pushUpgradeNotification(this.upgrade, this.player , success)

    }

    checkIfHasEnoughSilver(): boolean{
        if(this.player.silver >= this.upgrade.cost)
            return true
        else
            return false
    }

}

export default HandleUpgrade

interface UpgradeServices{
    handle(): void
    checkIfHasEnoughSilver(): boolean
}