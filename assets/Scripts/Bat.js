const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        weaponSpeed: 1,
    },

    start () {

    },

    onCollisionEnter: function (other, self) {
    }


});
