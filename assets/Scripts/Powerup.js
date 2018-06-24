cc.Class({
    extends: cc.Component,

    properties: {

    },



    start () {
        //this.node.runAction (cc.bezierTo (1, 0, 0));
    },

    //TODO
    // add health
    // ultra mode
    addAHealth () {

    },

    onCollisionEnter: function (other, self) {
        // var gmComp = cc.find ("Utility/Game Manager").getComponent("GameManager");
        // if (other.tag == 2 && !gmComp._isStopped) {
        //     gmComp.updateScoreUI();
        // }

        // if (other.tag == 1) {
        //     gmComp.stopGame();
        // }

        // check self tag
    }
});
