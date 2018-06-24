cc.Class({
    extends: cc.Component,

    properties: {
        uiSpeed: 1,
        gm: cc.Node,
    },

    start () {
        var scoreUI = cc.find ("Canvas/Score UI");
        scoreUI.y = scoreUI.y + cc.visibleRect.height;
    },

    startGameAndDismissUI () {
        // game manager startGmae
        // dismiss start UI
        this._dismissStartUI ();
        var gmComp = this.gm.getComponent ("GameManager");
        gmComp.startGame ();
        this._replaceWarrior ();
    },

    restartGameAndDismissUI () {
        this._dismissRestartUI ();
        var gmComp = this.gm.getComponent ("GameManager");
        gmComp.restartGame ();
        //this._replaceWarrior ();
    },    

    _dismissStartUI () {
        // title + warrior move up screen height
        // play button
        var welcomeUI = cc.find ("Canvas/Welcome UI");
        welcomeUI.runAction (cc.moveBy (1/this.uiSpeed, 0, cc.visibleRect.height));
    },

    _dismissRestartUI () {
        var scoreUI = cc.find ("Canvas/Score UI");
        scoreUI.runAction (cc.moveBy (1/this.uiSpeed, 0, cc.visibleRect.height));
    },

    _replaceWarrior () {
        // warrior running into scene
        var warrior = cc.find ("Canvas/Warrior");
        warrior.runAction (cc.moveBy (1, 0, -cc.visibleRect.height));
    },
    
    showScoreUI () {
        var scoreUI = cc.find ("Canvas/Score UI");
        scoreUI.runAction (cc.moveBy (1, 0, -cc.visibleRect.height));
    }
});
