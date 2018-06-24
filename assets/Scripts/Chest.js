const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        warningFadeInDuration: 0.3,
        warningFadeOutDuration: 0.1,
    },


    start () {
        this.moveUpwards (1);
    },

    moveUpwards (dir) { // 0 for left 1 for right
        var warning;
        var chestSpawnPos;
        var flashWarning = cc.sequence (cc.fadeTo (this.warningFadeInDuration, 255), cc.fadeTo (this.warningFadeOutDuration, 0));
        if (dir == 0) {
            warning = cc.find ("Canvas/Left Warning");
            chestSpawnPos = cc.find ("Canvas/Left Spawn Point");
        } else if (dir == 1) {
            warning = cc.find ("Canvas/Right Warning");
            chestSpawnPos = cc.find ("Canvas/Right Spawn Point");
            this.node.setScale (5, -5);

        }
        this.node.setPosition (chestSpawnPos);   
        warning.runAction (flashWarning);
        setTimeout(() => {
            var moveUpwards = cc.sequence (cc.delayTime (1), cc.moveBy (1/this.enemyProperty.speed, 0, cc.visibleRect.height*2)); 
            this.node.runAction (moveUpwards);    
        }, (this.warningFadeInDuration + this.warningFadeOutDuration) * 1000);

    },

    onCollisionEnter: function (other, self) {
        var gmComp = cc.find ("Utility/Game Manager").getComponent("GameManager");
        if (other.tag == 2 && !gmComp._isStopped) {
            gmComp.updateScoreUI();
        }

        if (other.tag == 1) {
            gmComp.stopGame();
        }
    }
});