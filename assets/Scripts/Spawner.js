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

    createAChest (dir) {
        var chest = cc.instantiate (this.chest);    // dont keep instantiate            
        chest.parent = this.canvas;
        chest.opacity = 0;
        chest.getComponent ("Chest").moveUpwards (dir);
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
    },

    createChestWave () {
        // while game is on
        // while (this.gm.getGameState ())
        // var waveType = Math.floor(Math.random() * 10);
        var waveType = 0;

        switch (waveType) {
           case 0:
           var dir = Math.random ();
           this.createChestsOn  (1, dir);
           // single left or right

           case 1:
           // double left or right
           var dir = Math.random ();
           this.createChestsOn  (2, dir);

           case 2:
           var dir = Math.random ();
           this.createChestsOn  (3, dir);
           // triple

           case 3:
           var dir = Math.random ();
           this.createChestsOn  (4, dir);
           // quadruaple

           case 4:
           // 1 + 1
           var dir = Math.random ();
           this.createChestsOn  (1, dir);

           case 5:
           // 1 + 2
           case 6:
           // 1 + 3
           case 7:
           // 1 + 4
           case 8:
           // 2 + 2
           case 9:
           // 2 + 3
           case 0:
           // 3 + 3

        };
    },
    
    createChestsOn (amount, dir) {
        var that = this;
        for (var i = 0; i < amount; i++) {
            setTimeout (function () {
                that.createAChest (dir);
            }, 1000);
        }
    }


    


});

module.exports = {Spawner};