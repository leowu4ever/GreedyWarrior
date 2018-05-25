const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        test: Spawner,

    },

     start () {
        cc.log("game manager starts");
        this.test.createEnemy();
    },
});
