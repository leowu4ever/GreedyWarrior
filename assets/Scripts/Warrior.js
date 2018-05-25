cc.Class({
    extends: cc.Component,

    properties: {

    },


    start () {
    },

    onCollisionEnter: function (other, self) {
        cc.log ("hitted by an enemy");
    }

});
