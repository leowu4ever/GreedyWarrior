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

        // spawn algorithm
        this.spawner.hidePointNodes ();
        // this.spawner.createAGhost ();
        // this.spawner.createAWizard ();
        // this.schedule (this.createEnemy, 3);
    },

    update () {
        
    },

    // createWave (createEnemyFunction, numOfEnemy, enemyInterval) {  
    //     this.schedule (createEnemyFunction, enemyInterval, numOfEnemy - 1);      
    // },
    
    _createEnemy () {
        //this.spawner.createAChest ();
        this.spawner.createABat ("Black");

        // rythme, pace, combo
    },

    updateScoreUI () {
        this._score++;
        this.scoreLabel.getComponent (cc.Label).string = this._score;
    },

    stopGame () {
        this.unschedule (this.createEnemy);
        this._isStopped = true;   // for testing
        var uiControllerComp = this.uiController.getComponent ("UIController");
        uiControllerComp.showScoreUI ();
    },


    getGameState () {
        return this._isStopped;
    },

    startGame () {
        this._createEnemy ();
        this._isStopped = false;
    },

    restartGame () {
        this._createEnemy ();
        this._isStopped = false;
    },

    shareGame () {
        
    },

    reduceHealth () {

    }

    


});
