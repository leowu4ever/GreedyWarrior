cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0.0,
        warrior: cc.Node,
        warriorHorizontalPosition: 0.0,
        _isOnLeft: true,
    },

    onLoad () {   
        this.node.on ("touchstart", this.jump, this);

    },

    jump () {
        var speed = 1/this.moveSpeed;
        var jumpToRight = cc.moveTo (speed, 319, this.warriorHorizontalPosition);
        var rotateToRight = cc.scaleTo (speed, 8, -8);
        var jumpToLeft = cc.moveTo (speed, -319, this.warriorHorizontalPosition);
        var rotateToLeft = cc.scaleTo (speed, 8, 8);

        // try spawn 
        // make the node zoom while it moves upwards
        // var spawn = cc.spawn(cc.moveBy(0.5, 0, 50), cc.scaleTo(0.5, 0.8, 1.4));
        // node.runAction(spawn);

        if (this._isOnLeft) {
            this.warrior.runAction (jumpToRight);
            this.warrior.runAction (rotateToRight);
            this._isOnLeft = false;
        } else {
            this.warrior.runAction (jumpToLeft);
            this.warrior.runAction (rotateToLeft);
            this._isOnLeft = true;
        } 
     }
});


