const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        spawner: Spawner,

    },

     start () {
        cc.log("game manager starts");
        //this.spawner.createChest ();
        //this.spawner.createBat ();

        this.spawner.createWave (3,3,2,2);

    },
});
