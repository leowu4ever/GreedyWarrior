const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        weaponSpeed: 1,
        batType: 0,
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
        warning.runAction (flashWarningSeq);
        cc.log (targetPoint);

        var targetWorldPos = warrior.getParent ().convertToWorldSpaceAR (targetPoint.getPosition());
        cc.log (targetWorldPos);

        var targetPos = this.node.convertToNodeSpaceAR (targetWorldPos);
        cc.log (targetPos);
        var fireWeapon = cc.moveTo (this.weaponSpeed, targetPos.x, targetPos.y);
        var weapon = this.node.getChildByName ("Bat Left Weapon");
        weapon.opacity = 255;
        weapon.runAction (fireWeapon);
    },
});
