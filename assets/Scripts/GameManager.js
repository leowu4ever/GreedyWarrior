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
        this.schedule (this.createChest, 2);

    },

    // createWave (createEnemyFunction, numOfEnemy, enemyInterval) {  
    //     this.schedule (createEnemyFunction, enemyInterval, numOfEnemy - 1);      
    // },
    
    createChest () {
        this.spawner.createAChest ();  
    },

});
