const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        weaponSpeed: 1,
        batType: "Black",
        warningFadeInDuration: 0.2,
        warningFadeOutDuration: 1,
        _leftWarning: cc.Node,
        _rightWarning: cc.Node,
        _weapon1: cc.Node,
        _weapon2: cc.Node,
    },

    start () {
        this._initRef ();
        this._hideWarningsAndArrows ();
        this.node.active = false;
    },

    _initRef () {
        this._leftWarning = this.node.getChildByName ("Bat Left Warning");
        this._rightWarning = this.node.getChildByName ("Bat Right Warning");
        this._weapon1 = this.node.getChildByName ("Bat Weapon1");
        this._weapon2 = this.node.getChildByName ("Bat Weapon2");
    },

    _hideWarningsAndArrows () {
        this._leftWarning.opacity = 0;
        this._rightWarning.opacity = 0;
        this._weapon1.opacity = 0;
        this._weapon2.opacity = 0;
    },


    moveToFirePosition () {
        var anchorPointHandlerComp = cc.find ("Utility/Anchor Point Handler").getComponent ("AnchorPointHandler");
        this.node.setPosition (anchorPointHandlerComp.getBatPoint ().getPosition ());
        var speed = 1/this.enemyProperty.speed;
        var moveUpwards = cc.moveBy (speed, 0, cc.visibleRect.height/3);
        this.node.runAction (moveUpwards);
        // this._weapon1.setPosition (cc.v2 (0, 25.2));
        // this._weapon2.setPosition (cc.v2 (0, 25.2));
    },

    flashWarningAndFire () {
        var anchorPointHandlerComp = cc.find ("Utility/Anchor Point Handler").getComponent ("AnchorPointHandler");

        var leftWarriorPoint = anchorPointHandlerComp.getWarriorLeftPoint ();
        var rightWarriorPoint = anchorPointHandlerComp.getWarriorRightPoint ();


        var warning;
        var targetPoint;

        var flashWarning = cc.sequence (cc.fadeTo (this.warningFadeInDuration, 255), cc.fadeTo (this.warningFadeOutDuration, 0));
        if (this._isWarriorOnLeftSide ()) {
            warning = this._leftWarning;
            targetPoint = leftWarriorPoint;
        } else {
            warning = this._rightWarning;
            targetPoint = rightWarriorPoint;
        }

        if (this.batType == "White") {
            warning.runAction (flashWarning);
        }

        var targetPos = this._getTargetPos (targetPoint);
        var fireWeapon1 = cc.sequence (cc.delayTime (this.warningFadeInDuration + this.warningFadeOutDuration), cc.fadeTo (0.1, 255), cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y), cc.fadeTo (0.1, 0), cc.place (cc.v2 (0, 25.2)));
        this._weapon1.runAction (fireWeapon1);

        setTimeout(() => {
            if (this.batType == "Black") {
                if (this._isWarriorOnLeftSide ()) {
                    targetPoint = leftWarriorPoint;
                } else {
                    targetPoint = rightWarriorPoint;
                }
                var targetPos = this._getTargetPos (targetPoint);
                var fireWeapon2 = cc.sequence (cc.fadeTo (0.1, 255), cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y), cc.fadeTo (0.1, 0), cc.place (cc.v2 (0, 25.2)));
                this._weapon2.runAction (fireWeapon2);
            }
        }, 2000);

        this.node.runAction (cc.sequence (cc.delayTime (3), cc.fadeTo (0.3, 0)));   // set active no here TO-DO
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
