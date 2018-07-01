cc.Class({
    extends: cc.Component,

    properties: {
        leftChestPoint: cc.Node,
        rightChestPoint: cc.Node,
        leftWarningPoint: cc.Node,
        rightWarningPoint: cc.Node,
        warriorLeftPoint: cc.Node,
        warriorRightPoint: cc.Node,  
    },
    

    onLoad () {
        // this.adjustAnchorPoint ();
        this.hideAnchorPoint ();
    },

    start () {
        
    },


    adjustAnchorPoint () {
        // chest - Preset using widget
        // warning - Preset using widget
        // warrior
    },

    hideAnchorPoint () {
        this.leftChestPoint.opacity = 0;
        this.rightChestPoint.opacity = 0;
        this.leftWarningPoint.opacity = 0;
        this.rightWarningPoint.opacity = 0;
        this.warriorLeftPoint.opacity = 0;
        this.warriorRightPoint.opacity = 0;
    },

    // a set of getter methods
    getLeftChestPoint () {
        return this.leftChestPoint;
    }, 
    getRightChestPoint () {
        return this.rightChestPoint;

    }, 
    getLeftWarningPoint () {
        return this.leftWarningPoint;

    }, 
    getRightWarningPoint () {
        return this.rightWarningPoint;

    }, 
    getWarriorLeftPoint () {
        return this.warriorLeftPoint;

    }, 
    getWarriorRightPoint () {
        return this.warriorRightPoint;
    }, 
});
