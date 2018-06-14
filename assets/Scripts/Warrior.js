cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        life: 0,
        normalSpriteFrame: cc.SpriteFrame,
        invertedSpriteFrame: cc.SpriteFrame,
        _isImmortal: false,
    },


    start () {
    },

    onCollisionEnter: function (other, self) {
        cc.log ("hitted by an enemy");
    },

    // change warrior sprite here 
    // change gm script TODO


    // show shield 
    showShield () {

    },

    showMad () {

    }

});
