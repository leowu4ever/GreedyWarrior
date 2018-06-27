const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        spawner: Spawner,
        scoreLabel: cc.Node,
        _score: 0,
        _isStopped: false,
        _isDefending: false,
        uiController: cc.Node,
        _health: 3,
    },

    start () {
        this.spawner.hidePointNodes ();
    },

    update () {
        
    },

    _createEnemies () {
        this.schedule (function () {
            this.spawner.createChestWave ();
        }, 2)
    },

    updateScoreUI () {
        this._score++;
        this.scoreLabel.getComponent (cc.Label).string = this._score;
    },

    stopGame () {
        this.unschedule (this._createEnemies);
        this._isStopped = true;   // for testing
        var uiControllerComp = this.uiController.getComponent ("UIController");
        uiControllerComp.showScoreUI ();
    },

    getGameState () {
        return this._isStopped;
    },

    startGame () {
        this._createEnemies ();
        this._isStopped = false;
        this._score = 0;
    },

    restartGame () {
        this._createEnemies ();
        this._isStopped = false;
        this._score = 0;
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
