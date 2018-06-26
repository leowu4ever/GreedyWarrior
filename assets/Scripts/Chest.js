const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        warningFadeInDuration: 0.3,
        warningFadeOutDuration: 0.1,
        _isCollected: false,
    },

    start () {
    },

    moveUpwards (dir) { // 0 for left 1 for right
        var warning;
        var chestSpawnPos;
        var flashWarning = cc.sequence (cc.fadeTo (this.warningFadeInDuration, 255), cc.fadeTo (this.warningFadeOutDuration, 0));
        if (!dir) {
            warning = cc.find ("Canvas/Left Warning");
            chestSpawnPos = cc.find ("Canvas/Left Spawn Point");
        } else {
            warning = cc.find ("Canvas/Right Warning");
            chestSpawnPos = cc.find ("Canvas/Right Spawn Point");
            this.node.setScale (5, -5);

        }
        this.node.setPosition (chestSpawnPos);
        this.node.opacity = 255;
        warning.runAction (flashWarning);
        setTimeout(() => {
            var moveUpwards = cc.sequence (cc.delayTime (1), cc.moveBy (1/this.enemyProperty.speed, 0, cc.visibleRect.height*2)); 
            this.node.runAction (moveUpwards);    
        }, (this.warningFadeInDuration + this.warningFadeOutDuration) * 1000);

    },

    onCollisionEnter: function (other, self) {
        var gmComp = cc.find ("Utility/Game Manager").getComponent("GameManager");
        if (other.tag == 2 && !gmComp._isStopped) {
            gmComp.updateScoreUI ();
            this._moveToScoreUI ();
            this._isCollected = true;
        }

        if (other.tag == 1 && !this._isCollected) {
            gmComp.stopGame ();
        }
    },

    _moveToScoreUI () {
        this.node.stopAllActions ();
        var scoreIcon = cc.find ("Canvas/Ingame UI/Score Icon");
        var scoreIconPos = cc.find ("Canvas").convertToNodeSpaceAR (scoreIcon.getParent(). convertToWorldSpaceAR (scoreIcon.getPosition ()));
        var moveAndShrankSpawn = cc.spawn (cc.scaleTo (1, 0.2), cc.moveTo (1, scoreIconPos.x, scoreIconPos.y));
        this.node.runAction (moveAndShrankSpawn);  
    }  


    
});