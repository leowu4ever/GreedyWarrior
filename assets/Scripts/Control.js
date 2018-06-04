cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0.0,
        warrior: cc.Node,
        warriorLeftPoint: cc.Node,
        warriorRightPoint: cc.Node,
        _isOnLeft: true,
        _isOnAir: false,
        _speed: 0,
    },

    onLoad () {
        // to control warrior   
        this.node.on ("touchstart", this.jump, this);
        this._speed = 1/this.speed;

    },

    jump () {
        // callback function when the movement is finished
        // check if is on the air
        cc.log (this._isOnAir);
        if (!this._isOnAir) {
            if (this._isOnLeft) {
                this._isOnAir = true;
                var jumpToRight = cc.moveTo (this._speed, this.warriorRightPoint.x, this.warriorRightPoint.y);
                var rotateToRight = cc.scaleTo (this._speed, 8, -8);
                var moveToRight = cc.spawn (jumpToRight, rotateToRight);
                var enableMoveToLeft = function () {

                    this.isOnleft = false;
                    this._isOnAir = false;
                }
                this.warrior.runAction (cc.sequence (moveToRight, cc.callFunc (enableMoveToLeft, this)));
                this.warrior.runAction (jumpToRight);
                this.warrior.runAction (rotateToRight);

                this._isOnLeft = false;
            } else {
                this._isOnAir = true;
                var jumpToLeft = cc.moveTo (this._speed, this.warriorLeftPoint.x, this.warriorLeftPoint.y);
                var rotateToLeft = cc.scaleTo (this._speed, 8, 8);
                var moveToLeft = cc.spawn (jumpToLeft, rotateToLeft);
                var enableMoveToRight = function () {
                    this._isOnLeft = true;
                    this._isOnAir = false;
                };
                this.warrior.runAction (cc.sequence (moveToLeft, cc.callFunc (enableMoveToRight, this)));
            }
        } 
     }
});


