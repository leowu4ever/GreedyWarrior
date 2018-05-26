const Spawner = require('Spawner').Spawner;

cc.Class({
    extends: cc.Component,

    properties: {
        spawner: Spawner,

    },

     start () {
        cc.log("game manager starts");
        this.spawner.createChest();
        this.spawner.createBat();

    },
});
