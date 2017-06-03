import * as cmpnt from '../LittleComponents/components'
import Player from './Player'
import Monster from './Monster'

import Upgrade from './Upgrade'
import HandleUpgrade from '../Combat/HandleUpgrades'

export default class UI{
    loaded: boolean
    dmgNotificationDuration: number = 500
    globalNotificationDuration: number = 2000
    upgrades: Upgrade[]
    player: Player
    constructor(player: Player, monster: Monster) {
        this.player = player
        this.loaded = true
        this.upgrades = player.upgrades
        this.setNick(player.name)
        this.setPlayerHp(player)
        this.setSilver(player.silver)
        this.setMonsterHp(monster)
        this.setInitialUpgradeList()
    }

    setNick(nick: string){
        cmpnt.nick.innerHTML = nick
    }

    setPlayerHp(player: Player):void{
        // cmpnt.playerStatus.children[0].value = player.currentHp.toString()
        // cmpnt.playerStatus.children[0].max = player.maxHp.toString()
        cmpnt.playerStatus.children[0].firstElementChild.innerHTML = player.currentHp.toString()
        cmpnt.playerStatus.children[0].lastElementChild.innerHTML = player.maxHp.toString()
    }    

    setSilver(silver: number){
        cmpnt.silver.innerHTML = silver.toString()
    }
    setStage(stage: number){
        cmpnt.stage.innerHTML = `Stage: ${stage}`
    }

    setMonsterName(monster: Monster):void{
        cmpnt.monster.children[0].firstElementChild.innerHTML = monster.name
    }

    setMonsterHp(monster: Monster):void{
        cmpnt.monster.children[1].firstElementChild.innerHTML = monster.currentHp.toString()
        cmpnt.monster.children[1].lastElementChild.innerHTML = monster.maxHp.toString()
    }

    setInitialUpgradeList(): void {
        this.clearUpgradeList()
        this.upgrades.map(up => cmpnt.upgradesUl.appendChild(this.li(up.level, up.name)))
        this.upgradesListener()
    }

    clearUpgradeList(): void{
        while(cmpnt.upgradesUl.firstChild){
            cmpnt.upgradesUl.removeChild(cmpnt.upgradesUl.firstChild)
        }
    }

    upgradesListener(): void{
        const lis = document.querySelectorAll('.upgrade-element')
        lis.forEach( li => li.addEventListener('click', ()=>{
            const upgrade = new HandleUpgrade(li.dataset.name, this.player, this)
            upgrade.handle()
        }))
    }    

    pushDmgNotificationPlayer(player: Player, dmg: number): void{
        const spread: number = 200;
        const notif = document.createElement('p')
        notif.textContent = `${dmg}`
        notif.classList.add('notif')
        notif.style.top = `${(Math.floor(Math.random() *spread)).toString()}px`
        notif.style.left = `${(Math.floor(Math.random() *spread)).toString()}px`
        cmpnt.notification.appendChild(notif);
        setTimeout(() => cmpnt.notification.removeChild(notif), this.dmgNotificationDuration)
    }

    pushDmgNotificationMonster(monster: Monster, dmg: number): void{
        const spread: number = 50;
        const notif = document.createElement('p')
        notif.textContent = `${dmg}`
        notif.classList.add('notif-p')
        notif.style.top = `${(Math.floor(Math.random() *spread)).toString()}px`
        notif.style.left = `${(Math.floor(Math.random() *spread)).toString()}px`
        cmpnt.notificationPlayer.appendChild(notif);
        setTimeout(() => cmpnt.notificationPlayer.removeChild(notif), this.dmgNotificationDuration)
    }

    pushUpgradeNotification(upgrade: Upgrade, player: Player, success: boolean): void{

        let text: string;
        switch(success)
        {
            case true:
                text = `You have successfuly upgrade '${upgrade.name}'`
            break;

            case false:
                text = `You need ${upgrade.cost - player.silver} more silver to upgrade: '${upgrade.name}'`
            break;
        }
        
        const pack = document.createElement('div')
        pack.classList.add('notgif-g')
        pack.style.left = '0'
        const spread: number = 50;
        const notif = document.createElement('p')
        notif.textContent = text
        pack.appendChild(notif)
        cmpnt.globalNotifications.appendChild(pack);
        setTimeout(() => cmpnt.globalNotifications.removeChild(pack), this.globalNotificationDuration)
    }    

    li(level: number, name: string): HTMLElement{
        const li = document.createElement('li');

        const button = document.createElement('button')
        button.value = 'upgrade'
        button.textContent = 'upgrade'
        button.classList.add('upgrade-element')
        button.dataset.name = name

        const p = document.createElement('p')
        p.textContent = `Lv${level} - ${name}`
        
        li.appendChild(p)
        li.appendChild(button)

        return li
    }  
}
