const Enemy = require('Enemy').Enemy;

cc.Class({
    extends: cc.Component,

    properties: {
        enemyProperty: Enemy,
        invertTime: 5,
    },


    start () {
        this.node.setPosition (cc.v2 (0, 0));
    },

    invertControl () {
        
    },

    showAndInvert () {
        var controlComp = cc.find ("Canvas").getComponent ("Control");

        var warriorComp = cc.find ("Canvas/Warrior").getComponent ("Warrior");
        // invert control - control script
        // show inverted sprite - warrior sprite
        controlComp.invertControl ();
        warriorComp.showInvertedWarrior ();
        
        setTimeout(() => {
            this.node.runAction (cc.fadeTo (0.5, 0));
            controlComp.revertControl ();
            warriorComp.showNormalWarrior ();
        }, this.invertTime * 1000);
    }
});
