cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        life: 0,
        normalSpriteFrame: cc.SpriteFrame,
        invertedSpriteFrame: cc.SpriteFrame,
    },


    start () {
    },

    onCollisionEnter: function (other, self) {
        cc.log ("hitted by an enemy");
    }  

});
