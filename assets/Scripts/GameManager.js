const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        spawner: Spawner,
        scoreLabel: cc.Node,
        _score: 0,
    },

    start () {
    //   this.createWave (this.createChest, 2,2); 
    //   this.createWave (this.createBat, 2,2); 
        
        this.spawner.createChest2 ();
    },

    // createWave (createEnemyFunction, numOfEnemy, enemyInterval) {  
    //     this.schedule (createEnemyFunction, enemyInterval, numOfEnemy - 1);      
    // },
    
    // createChest () {
    //     this.spawner.createChest ();  
    // },

    // createBat () {
    //     this.spawner.createBat ();
    // }
});
