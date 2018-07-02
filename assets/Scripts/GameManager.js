//const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        //spawner: Spawner,
        scoreLabel: cc.Node,
        _score: 0,
        _isStopped: false,
        _isDefending: false,
        uiController: cc.Node,
        _health: 3,
        spawner: cc.Node,
    },

    start () {
        // this.spawner.hidePointNodes ();
        // this.spawner.createChest (false);
        // this.spawner.getComponent ("Spawner").createAGhost ();
    },

    update () {
    },

    _createEnemies () {
        this.createChestWave = function () {
            if (this.getGameState ()) {
                this.unschedule (this.createChestWave);
            }
            this.spawner.getComponent ("Spawner").createChestWave ();
            // this.spawner.getComponent ("Spawner").createChest (false);
            // this.spawner.getComponent ("Spawner").createBat ("Black");
        }
        this.schedule (this.createChestWave, 5);
    },
    
    resetScore () {
        this._score = 0;
        this.scoreLabel.getComponent (cc.Label).string = this._score;
    },


    addScore () {
        this._score++;
        this.scoreLabel.getComponent (cc.Label).string = this._score;
    },

    stopGame () {
        this._isStopped = true;   // for testing
        var uiControllerComp = this.uiController.getComponent ("UIController");
        uiControllerComp.showScoreUI ();
        cc.log ("stop");
        // spawner stop chest actions

    },

    getGameState () {
        return this._isStopped;
    },

    startGame () {
        this._createEnemies ();
        this._isStopped = false;
        this.resetScore ();
    },

    restartGame () {
        this._createEnemies ();
        this._isStopped = false;
        this.resetScore ();
        this.spawner.getComponent ("Spawner").initNodes ();

    },

    shareGame () {
        // call weixin api
    },

    reduceHealth () {
        this._health--;
    },

    getScore () {
        return this._score;
    }
});
