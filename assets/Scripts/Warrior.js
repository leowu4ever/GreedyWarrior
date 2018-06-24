cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        life: 0,

        _isImmortal: false,
        shield: cc.Node,
        invertedWarrior: cc.Node,
        normalWarrior: cc.Node,
        shieldDuration: 3,
    },

    start () {
        this.invertedWarrior.opacity = 0;
        this.shield.opacity = 0;
        this.node.y = this.node.y + cc.visibleRect.height;
    },

    onCollisionEnter: function (other, self) {
        cc.log ("hitted by an enemy");
    },

    showShield () {
        this.shield.runAction (cc.fadeTo (0.2, 255));
        this.normalWarrior.opacity = 50;
    },

    hideShield () {
        this.shield.runAction (cc.fadeTo (0.2, 0));
        this.normalWarrior.opacity = 255;
    },

    showInvertedWarrior () {
        this.normalWarrior.opacity = 0;
        this.invertedWarrior.opacity = 255;
    },

    showNormalWarrior () {
        this.normalWarrior.opacity = 255;
        this.invertedWarrior.opacity = 0;
    }    


});
