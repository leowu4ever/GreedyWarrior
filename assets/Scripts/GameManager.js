const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        spawner: Spawner,
        scoreLabel: cc.Node,
        _score: 0,
    },

    start () {

        this.spawner.hidePointNodes ();
        this.schedule (this.createEnemy, 3);

    },

    update () {
        //cc.log (this._score);
    },

    // createWave (createEnemyFunction, numOfEnemy, enemyInterval) {  
    //     this.schedule (createEnemyFunction, enemyInterval, numOfEnemy - 1);      
    // },
    
    createEnemy () {
        this.spawner.createAChest ();  
        this.spawner.createABat (0);
    },

    updateScoreUI () {
        this._score++;
        this.scoreLabel.getComponent (cc.Label).string = "Score " + this._score;
    },

    gameover () {

    }

});
