cc.Class({
    extends: cc.Component,

    properties: {
        uiSpeed: 1,
    },

    start () {

    },

    startGameAndDismissUI () {
        // game manager startGmae
        // dismiss start UI
        this._dismissStartUI ();
        var gm = cc.find ("Utility/Game Manager").getComponent ("GameManager");
        gm.startGame ();
        this._replaceWarrior ();
    },

    restartGameAndDismissUI () {
        this._dismissRestartUI ();
        var gm = cc.find ("Utility/Game Manager").getComponent ("GameManager");
        gm.restartGame ();
        this._replaceWarrior ();
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

    },
});
