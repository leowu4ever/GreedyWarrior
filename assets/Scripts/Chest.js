const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        
    },


    start () {
    },

    onCollisionEnter: function (other, self) {

        if (other.tag == 1) {
            cc.find ("Utility/Game Manager").getComponent("GameManager").updateScoreUI();

        }
    
    }
});
