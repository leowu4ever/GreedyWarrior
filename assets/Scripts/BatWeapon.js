cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {

    },

    onCollisionEnter: function (other, self) {
        var gmComp = cc.find ("Utility/Game Manager").getComponent("GameManager");
        if (other.tag == 2 && !gmComp._isStopped) {
            gmComp.stopGame ();
        }
    },
});
