cc.view.enableAntiAlias(false);

cc.Class({
    extends: cc.Component,

    start () {
        cc.director.setDisplayStats(false);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
});
