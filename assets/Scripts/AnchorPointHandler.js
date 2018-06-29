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
        this.adjustAnchorPoint ();
        //this.hideAnchorPoint ();
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
        return this.leftChestPoint.getPosition ();
    }, 
    getRightChestPoint () {
        return this.rightChestPoint.getPosition ();

    }, 
    getLeftWarningPoint () {
        return this.leftWarningPoint.getPosition ();

    }, 
    getRightWarningPoint () {
        return this.rightWarningPoint.getPosition ();

    }, 
    getWarriorLeftPoint () {
        return this.warriorLeftPoint.getPosition ();

    }, 
    getWarriorRightPoint () {
        return this.warriorRightPoint.getPosition ();
    }, 
});
