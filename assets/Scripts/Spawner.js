const Wave = require('Wave').Wave;
// need to require enemy script

var Spawner = cc.Class({

    extends: cc.Component,

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
        waveSpawnInterval: 300, // different side
        firstLevelScore: 30,
        secondLevelScore: 50,
        
        // for spawning
        _chestPool: cc.Nodepool,
        _chestPoolSize: 20,
        _batWhite: cc.Node,
        _batBlack: cc.Node,
        _ghost: cc.Node,
        _warrior: cc.Node,
        
        // prefabs for instantiation
        chestPrefab: cc.Prefab,
        batWhitePrefab: cc.Prefab,
        batBlackPrefab: cc.Prefab,
        ghostPrefab: cc.Prefab,
        warriorPrefab: cc.Prefab,
    },
    
    onLoad () {
        this.initNodes ();
        cc.log ("load");
    },

    initNodes () {
        // init chest pool
        this._chestPool = new cc.NodePool ("Chest");
        for (var i = 0; i < this._chestPoolSize; i++) {
            let chest = cc.instantiate (this.chestPrefab);  
            this._chestPool.put (chest);
        }    

        // init white/black bat
        this._batWhite = cc.instantiate (this.batWhitePrefab);    
        this._batblack = cc.instantiate (this.batBlackPrefab);

        // init ghost 
        this._ghost = cc.instantiate (this.ghostPrefab);

        // init warrior
        this._warrior = cc.instantiate (this.warriorPrefab);
    },

    createChest (dir) {
        var chest = null;
        if (this._chestPool.size () > 0) {
            chest = this._chestPool.get (dir);
        } else {
            chest = cc.instantiate (this.chestPrefab);
        }
        chest.parent = this.canvas;
    },

    createWarrior () {


    },
    createBat (color) {
        // set active here
        // 

    },
    createGhost () {
        // set active here
        
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
            var gmComp = cc.find ("Utility/Game Manager").getComponent ("GameManager");
            var score = gmComp.getScore ();
            var waveType;
            
            if (score >= 0 && score < this.firstLevelScore) {
                waveType = this.getARandomIntBetween (0, 3);
            } else if (score >= this.firstLevelScore && score < this.secondLevelScore) {
                waveType = this.getARandomIntBetween (4, 7);
            } else if (score >= this.secondLevelScore) {
                waveType = this.getARandomIntBetween (8, 12);
            }

            cc.log ("case " + waveType)
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
                this.createChestsOn (3, dir, 4, !dir);
                break;
            };

            
            if (waveType >= 1 && waveType <= 3) {
                this.createAGhost ();
            }


            if (waveType >= 4 && waveType <= 7) {
                this.createABat ('White');
            }

            if (waveType >= 8) {
                this.createAGhost ();
            }
    },

    createChestsOn (amount1, dir1, amount2, dir2) {
        var that = this;
        for (var i = 0; i < amount1; i++) {
            setTimeout(() => {
                that.createAChest (dir1);
            }, 200*i);
            
            for (var j = 0; j < amount2; j++) {
                setTimeout(() => {
                    that.createAChest (dir2);
                }, 200 * j + this.waveSpawnInterval);
            }
        }
    },

    getARandomIntBetween (min, max) {
        return Math.floor( Math.random () * (max-min+1) + min);
    }
});

module.exports = {Spawner};