cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        life: 0,

    },


    start () {
    },

    onCollisionEnter: function (other, self) {
        cc.log ("hitted by an enemy");
    }

    

});
