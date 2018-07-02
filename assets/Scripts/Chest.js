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

    moveUpwards (dir) {
        this._isCollected = false;
        cc.log ("move");
        var anchorPointHandlerComp = cc.find ("Utility/Anchor Point Handler").getComponent ("AnchorPointHandler");
        var warning;
        var chestSpawnPoint;
        if (!dir) {
            warning = anchorPointHandlerComp.getLeftWarningPoint ();
            chestSpawnPoint = anchorPointHandlerComp.getLeftChestPoint ();
            this.node.setScale (cc.v2 (5,5));
        } else {
            warning = anchorPointHandlerComp.getRightWarningPoint ();
            chestSpawnPoint = anchorPointHandlerComp.getRightChestPoint ();
            this.node.setScale (cc.v2 (5,-5));
        }

        this.node.setPosition (chestSpawnPoint.getPosition ());
        this.node.opacity = 255;
        var flashWarningSeq = cc.sequence (cc.fadeTo (this.warningFadeInDuration, 255), cc.fadeTo (this.warningFadeOutDuration, 0));
        warning.runAction (flashWarningSeq);
        
        // after warning, move up, place at origion
        var moveUpwards = cc.sequence (cc.delayTime (this.warningFadeInDuration + this.warningFadeOutDuration), cc.moveBy (1/this.enemyProperty.speed, 0, cc.visibleRect.height*2)); 
        this.node.runAction (moveUpwards);    
    },
 
    onCollisionEnter (other, self) {
        var gmComp = cc.find ("Utility/Game Manager").getComponent("GameManager");
        if (other.tag == 2 && !gmComp._isStopped) {
            gmComp.addScore ();
            this._moveToScoreUI ();
            this._isCollected = true;
        }

        if (other.tag == 1 && !this._isCollected && !gmComp._isStopped) {
            gmComp.stopGame ();
        }
    },

    _moveToScoreUI () {
        this.node.stopAllActions ();
        var scoreIcon = cc.find ("Canvas/Ingame UI/Score Icon");
        var scoreIconPos = cc.find ("Canvas").convertToNodeSpaceAR (scoreIcon.getParent(). convertToWorldSpaceAR (scoreIcon.getPosition ()));
        // call back function
        var that = this;
        var recycleCallback = function () {
            //this.node.opacity = 0;
            cc.find ("Utility/Spawner").getComponent ("Spawner").recycleChest (this.node);
        }
        var moveAndShrankSpawn = cc.sequence (cc.spawn (cc.moveTo (1, scoreIconPos.x, scoreIconPos.y), cc.scaleTo (1, 0)),cc.delayTime (2), cc.callFunc (recycleCallback, this));
        this.node.runAction (moveAndShrankSpawn);  
    },

    stopAction () {
        this.node.stopAllActions ();
    },

});