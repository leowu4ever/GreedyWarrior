const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        
    },


    start () {

    },

    onCollisionEnter: function (other, self) {
    }
});
