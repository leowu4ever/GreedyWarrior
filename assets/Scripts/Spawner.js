const Wave = require('Wave').Wave;
// need to require enemy script

var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        chest: cc.Prefab,
        ghost: cc.Prefab,
        wizard: cc.Prefab,
        canvas: cc.Node,
        bat: [cc.Prefab],
        warrior: cc.Node,
        wave: [Wave],   // enemy,numOfEnemy,enemyInterval,waveDelay
        leftSpawnPoint: cc.Node,
        rightSpawnPoint: cc.Node,
        leftWarning: cc.Node,
        rightWarning: cc.Node,
        chestShowUpDelay: 0.3,
        warriorLeftPoint: cc.Node,
        warriorRightPoint: cc.Node,
        bat_white: cc.Prefab,
        bat_black: cc.Prefab,
    },
    
    ctor () {
    },

    hidePointNodes () {
        this.leftSpawnPoint.opacity = 0;
        this.rightSpawnPoint.opacity = 0;
        this.leftWarning.opacity = 0;
        this.rightWarning.opacity = 0;
        this.warriorLeftPoint.opacity = 0;
        this.warriorRightPoint.opacity = 0;
    },

    createAChest () {
        var chest = cc.instantiate (this.chest);    // dont keep instantiate            
        chest.parent = this.canvas;
    },

    createAWizard () {
        var wizardGroup = cc.instantiate (this.wizard);
        wizardGroup.parent = this.canvas;
        wizardGroup.setPosition (this.leftWarning); 
    },

    createABat (batType) {
        var batGroup;
        if (batType == "White") {
            batGroup = cc.instantiate (this.bat_white);
        } else if (batType == "Black") {
            batGroup = cc.instantiate (this.bat_black);
        }
        batGroup.parent =  this.canvas;
        batGroup.setPosition (cc.v2 (0, this.leftSpawnPoint.y));
    },

    createAGhost () {
        var ghostGroup = cc.instantiate (this.ghost);
        ghostGroup.parent = this.canvas;
    }

});

module.exports = {Spawner};