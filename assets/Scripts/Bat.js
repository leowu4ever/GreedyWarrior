const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        weaponSpeed: 1,
        batType: "Black",
        warningFadeInDuration: 0.2,
        warningFadeOutDuration: 1,
    },

    start () {
        // start position
    },

    onCollisionEnter: function (other, self) {
    },

    moveToFirePosition () {
        var speed = 1/this.enemyProperty.speed;
        var moveUpwards = cc.moveBy (speed, 0, cc.visibleRect.height/2);
        this.node.runAction (moveUpwards);
    },

    flashWarningAndFire () {
        var leftWarning = this.node.getChildByName ("Bat Left Warning");
        var rightWarning = this.node.getChildByName ("Bat Right Warning");
        var leftWarriorPoint = cc.find ("Canvas/Warrior Left Point");
        var rightWarriorPoint = cc.find ("Canvas/Warrior Right Point");

        var warning;
        var targetPoint;

        var flashWarning = cc.sequence (cc.fadeTo (this.warningFadeInDuration, 255), cc.fadeTo (this.warningFadeOutDuration, 0));
        if (this._isWarriorOnLeftSide ()) {
            warning = leftWarning;
            targetPoint = leftWarriorPoint
        } else {
            warning = rightWarning;
            targetPoint = rightWarriorPoint;
        }

        if (this.batType == "White") {
            warning.runAction (flashWarning);
        }

        var targetPos = this._getTargetPos (targetPoint);
        var weapon = this.node.getChildByName ("Bat Left Weapon");
        var fireWeapon = cc.sequence (cc.delayTime (this.warningFadeInDuration + this.warningFadeOutDuration), cc.fadeTo (0.1, 255), cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y), cc.hide ());
        weapon.runAction (fireWeapon);
        
        setTimeout(() => {
            if (this.batType == "Black") {
                if (this._isWarriorOnLeftSide ()) {
                    targetPoint = leftWarriorPoint;
                } else {
                    targetPoint = rightWarriorPoint;
                }
                var targetPos = this._getTargetPos (targetPoint);
                var right = this.node.getChildByName ("Bat Right Weapon");
                var fireWeapon = cc.sequence (cc.fadeTo (0.1, 255), cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y));
                right.runAction (fireWeapon);
            }  
        }, 2000);

        this.node.runAction (cc.sequence (cc.delayTime (3), cc.fadeTo (0.3, 0)));

    },

    _getTargetPos (targetPoint) {
        var targetPos = this.node.convertToNodeSpaceAR (cc.find ("Canvas/Warrior").getParent ().convertToWorldSpaceAR (targetPoint.getPosition ()));
        return targetPos;
    },

    _isWarriorOnLeftSide () {
        var warriorPos = cc.find ("Canvas/Warrior").getPosition ();
        if (warriorPos.x < 0) {
            return true;
        } else {
            return false;
        }
    }
});
