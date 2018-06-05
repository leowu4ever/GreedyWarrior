const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        
    },


    start () {
    },

    onCollisionEnter: function (other, self) {
        var gm = cc.find ("Utility/Game Manager").getComponent("GameManager");
        if (other.tag == 1 && !gm._isStopped) {
            gm.updateScoreUI();

        }

        if (other.tag == 2) {
            gm.stopGame();

        }
    
    }
});
