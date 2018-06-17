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
        
        var randomNum = Math.random ();
        var flashWarning = cc.sequence (cc.fadeTo (0.3, 255), cc.fadeTo (0.1, 0));
        if (randomNum > 0.5) {
            this.leftWarning.runAction (flashWarning);
            chest.setPosition (cc.v2 (this.leftSpawnPoint.x, this.leftSpawnPoint.y));

        } else {
            this.rightWarning.runAction (flashWarning);
            chest.setPosition (cc.v2 (this.rightSpawnPoint.x, this.rightSpawnPoint.y));
            chest.setScale (5, -5);
        }
        
        var speed = chest.getComponent ("Chest").enemyProperty.speed;
        var moveUpwards = cc.sequence (cc.delayTime (1), cc.moveBy (1/speed, 0, -this.rightSpawnPoint.y*2)); 
        
        chest.runAction (moveUpwards);
    },


    createAGhost () {
        var ghostGroup = cc.instantiate (this.ghost);
        ghostGroup.parent = this.canvas;

        ghostGroup.setPosition (cc.v2 (0, 0));   // need related pos
        var invertTime = ghostGroup.getComponent ("Ghost").invertTime;
        var control = this.canvas.getComponent("Control");
        var that = this;
        ghostGroup.getComponent ("Ghost").scheduleOnce (function () {
            control.invertControl ();
            that.warrior.getComponent ("Warrior").showInvertedWarrior (); 
        }, 2);

        var revertControl = function () {
            control.revertControl ();
            this.warrior.getComponent ("Warrior").showNormalWarrior ();  
        };
        ghostGroup.runAction (cc.sequence (cc.delayTime (invertTime), cc.fadeTo (0.5, 0), cc.callFunc (revertControl, this)));
    },
    

    createAWizard () {
        var wizardGroup = cc.instantiate (this.wizard);
        wizardGroup.parent = this.canvas;
        wizardGroup.setPosition (this.leftWarning); 
    },

    createABat (batType) {
        var batGroup = cc.instantiate (this.bat_white);
        batGroup.parent =  this.canvas;
        batGroup.setPosition (cc.v2 (0, this.leftSpawnPoint.y));
    }

});

module.exports = {Spawner};