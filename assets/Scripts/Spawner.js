const Wave = require('Wave').Wave;
// need to require enemy script

var Spawner = cc.Class({

    extends: cc.Component,

    properties: {

        chestSpawnInterval: 300, // in milisec , same side
        waveSpawnInterval: 1000, // different side
        firstLevelScore: 20,   // trigger to second level
        secondLevelScore: 40,
        
        // for spawning
        _chestPool: cc.Nodepool,
        _chestPoolSize: 20,

        ghost: cc.Node,
        canvas: cc.Node,
        warrior: cc.Node,
        bat_white: cc.Node,
        bat_black: cc.Node,
        
        // prefabs for instantiation
        chestPrefab: cc.Prefab,
    },
    
    onLoad () {
        this.initNodes ();
    },

    initNodes () {
        // init chest pool
        this._chestPool = new cc.NodePool ();
        for (var i = 0; i < this._chestPoolSize; i++) {
            let chest = cc.instantiate (this.chestPrefab);  
            this._chestPool.put (chest);
        }    
    },

    createChest (dir) {
        //console.clear ();
        cc.log ("chest size" + this._chestPool.size ());
        var chest = null;
        if (this._chestPool.size () > 0) {
            chest = this._chestPool.get (dir);
            cc.log ("pool");

        } else {
            chest = cc.instantiate (this.chestPrefab);
            cc.log ("ins");
        }
        chest.parent = this.canvas;
        chest.getComponent ("Chest").moveUpwards (dir);
    },

    recycleChest (chest) {
        this._chestPool.put (chest);
    },

    createWarrior () {
        // TO-DO
    },

    createGhost () {
        this.ghost.active = true;
        var animationComp = this.ghost.getComponent (cc.Animation);
        animationComp.play ("Ghost");
        setTimeout(() => {
            this.ghost.opacity = 255;
        }, 10);
    },

    createBat (batType) {
        var batGroup;
        if (batType == "White") {
            this.bat_white.active = true;
            var animationComp = this.bat_white.getComponent (cc.Animation);
            animationComp.play ("Bat_Sequence");
            setTimeout(() => {
                this.bat_white.opacity = 255;
            }, 10);

        } else if (batType == "Black") {

            this.bat_black.active = true;
            var animationComp = this.bat_black.getComponent (cc.Animation);
            animationComp.play ("Bat_Sequence");
            setTimeout(() => {
                this.bat_black.opacity = 255;        
            }, 10);
        }
    },

    createChestWave () {
 
        var gmComp = cc.find ("Utility/Game Manager").getComponent ("GameManager");
        var score = gmComp.getScore ();
        var waveType;
        
        // for chest wave
        if (score >= 0 && score < this.firstLevelScore) {
            waveType = this.getARandomIntBetween (0, 3);
        } else if (score >= this.firstLevelScore && score < this.secondLevelScore) {
            waveType = this.getARandomIntBetween (4, 7);
            
            var spawnDice = this.getARandomIntBetween (0, 1);
            if (spawnDice > 0.5) {
                //this.createBat ('White');
            } 

        } else if (score >= this.secondLevelScore) {
            waveType = this.getARandomIntBetween (8, 12);

            var spawnDice = this.getARandomIntBetween (0, 1);
            if (spawnDice > 0.5) {
                var enemyDice = this.getARandomIntBetween (0, 1);
                if (enemyDice > 0.5) {
                    //this.createBat ('Black');    
                } else {
                    this.createGhost ();
                }
            } 
        }

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
    },

    stopChestWave () {
        // get active node in a list

    },

    createChestsOn (amount1, dir1, amount2, dir2) {
        var that = this;
        for (var i = 0; i < amount1; i++) {
            setTimeout(() => {
                that.createChest (dir1);
            }, this.chestSpawnInterval*i);
            
            for (var j = 0; j < amount2; j++) {
                setTimeout(() => {
                    that.createChest (dir2);
                }, this.chestSpawnInterval * j + this.waveSpawnInterval);
            }
        }
    },

    getARandomIntBetween (min, max) {
        return Math.floor( Math.random () * (max-min+1) + min);
    }
});

module.exports = {Spawner};