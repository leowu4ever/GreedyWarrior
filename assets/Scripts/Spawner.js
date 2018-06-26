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
        chestSpawnInterval: 300, // in milisec , same side
        comboSpawnInterval: 300, // different side
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
        var waveType = 10;

        // left -> false
        switch (waveType) {
            case 0:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (1, dir, 0, !dir);
            break;

            case 1:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (2, dir, 0, !dir);
            break;

            case 2:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (3, dir, 0, !dir);
            break;

            case 3:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (4, dir, 0, !dir);
            break;

            case 4:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (1, dir, 1, !dir);
            break;

            case 5:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (1, dir, 2, !dir);
            break;

            case 6:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (1, dir, 3, !dir);
            break;

            case 7:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (1, dir, 4, !dir);
            break;

            case 8:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (2, dir, 2, !dir);
            break;

            case 9:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (2, dir, 3, !dir);
            break;

            case 10:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (2, dir, 4, !dir);
            break;

            case 11:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (3, dir, 3, !dir);
            break;

            case 12:
            var dir = Math.random () >= 0.5;
            this.createChestsOn (3, dir, 3, !dir);
            break;
        };
    },
    
    createChestsOn (amount, dir) {
        var that = this;
        for (var i = 0; i < amount; i++) {
            setTimeout(() => {
                that.createAChest (dir);
            }, 200*i);
        }
    },
    

    createChestsOn (amount1, dir1, amount2, dir2) {

        var that = this;
        for (var i = 0; i < amount1; i++) {
            setTimeout(() => {
                that.createAChest (dir1);
            }, 200*i);
            
            for (var j= 0; j < amount2; j++) {
                setTimeout(() => {
                    that.createAChest (dir2);
                }, 200*j + this.comboSpawnInterval);
            }
        }
    }
});

module.exports = {Spawner};