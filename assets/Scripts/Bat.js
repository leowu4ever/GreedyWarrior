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
    },

    onCollisionEnter: function (other, self) {
    },

    moveToFirePosition () {
        var speed = 1/this.enemyProperty.speed;
        var moveUpwards = cc.moveBy (speed, 0, cc.visibleRect.height/3);
        this.node.runAction (moveUpwards);
    },

    flashWarningAndFire () {
        var warrior = cc.find ("Canvas/Warrior");
        var warriorWorldPos = warrior.getParent ().convertToWorldSpaceAR (warrior.getPosition());
        var warriorPos = this.node.convertToNodeSpaceAR (warriorWorldPos);
        var warning;
        var targetPoint;
        var flashWarningSeq = cc.sequence (cc.fadeTo (this.warningFadeInDuration, 255), cc.fadeTo (this.warningFadeOutDuration, 0));
        if (warriorPos.x < 0) {
            warning = this.node.getChildByName ("Bat Left Warning");
            targetPoint = cc.find ("Canvas/Warrior Left Point");
        } else {
            warning = this.node.getChildByName ("Bat Right Warning");
            targetPoint = cc.find ("Canvas/Warrior Right Point");
        }
        if (this.batType == "White") {
            warning.runAction (flashWarningSeq);
        }

        var targetWorldPos = warrior.getParent ().convertToWorldSpaceAR (targetPoint.getPosition());
        var targetPos = this.node.convertToNodeSpaceAR (targetWorldPos);
        var weapon = this.node.getChildByName ("Bat Left Weapon");
        var weaponStartPos = weapon.getPosition ();

        var fireWeapon = cc.sequence (cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y), cc.hide ());

        weapon.opacity = 255;
        weapon.runAction (fireWeapon);
        
        if (this.batType == "Black") {
            setTimeout(() => {
                var warriorWorldPos = warrior.getParent ().convertToWorldSpaceAR (warrior.getPosition());
                var warriorPos = this.node.convertToNodeSpaceAR (warriorWorldPos);
                if (warriorPos.x < 0) {
                    targetPoint = cc.find ("Canvas/Warrior Left Point");
                } else {
                    targetPoint = cc.find ("Canvas/Warrior Right Point");
                }
                var targetWorldPos = warrior.getParent ().convertToWorldSpaceAR (targetPoint.getPosition());
                var targetPos = this.node.convertToNodeSpaceAR (targetWorldPos);
                var fireWeapon = cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y);
                    
                var right = this.node.getChildByName ("Bat Right Weapon");
                right.opacity = 255;
                right.runAction (fireWeapon);
                cc.log ("1");
            }, 1000);
        }

        setTimeout(() => {
            this.node.runAction (cc.fadeTo (0.3, 0));
            cc.log ("2");

        }, 2000);
    },
});
