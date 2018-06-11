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
        _isInverted: false,
        swipeThreshold: 100,
        
    },

    onLoad () {
        this._speed = 1/this.speed;
        this.node.on ("touchmove", this.move, this);
        //this.node.on ("touchstart", this., this);

    },
    
    move (event) {
        var gm = cc.find ("Utility/Game Manager").getComponent("GameManager");
        var startTouch = event.getTouches ()[0].getStartLocation ();
        var curTouch = event.getTouches ()[0].getLocation ();
        var xDif = curTouch.x - startTouch.x;
        var yDif = curTouch.y - startTouch.y;

        if (!gm.getGameState ()) {
            if (!this._isOnAir) {
                if (this._isOnLeft) {
                    if (!this._isInverted) {    // not inverted
                        if (xDif > this.swipeThreshold) {
                            // left & swiping right
                            this.moveToRight ();
                        } else if (xDif < -this.swipeThreshold) {
                            // left & swiping left
                            //this.moveToLeft ();
                        }
                    } else {    // inverted
                        if (xDif > this.swipeThreshold) {
                            // left & swiping right
                            //this.moveToLeft ();
                         
                        } else if (xDif < -this.swipeThreshold) {
                            this.moveToRight ();
                        }
                    }    
                } else {
                    if (!this._isInverted) {
                        if (xDif > this.swipeThreshold) {
                            //this.moveToLeft ();
                         
                        } else if (xDif < -this.swipeThreshold) {
                            this.moveToLeft ();
                        }
                    } else {
                        if (xDif > this.swipeThreshold) {
                            this.moveToLeft ();
                         
                        } else if (xDif < -this.swipeThreshold) {
                            //this.moveToLeft ();
                        }
                    }    
                }
            }   
        }
    },

    invertControl () {
        this._isInverted = true;
    },

    revertControl () {
        this._isInverted = false;
    },


    moveToLeft () {
        this._isOnAir = true;
        var jumpToLeft = cc.moveTo (this._speed, this.warriorLeftPoint.x, this.warriorLeftPoint.y);
        var rotateToLeft = cc.scaleTo (this._speed, 8, 8);
        var moveToLeft = cc.spawn (jumpToLeft, rotateToLeft);
        var enableMoveToRight = function () {
            this._isOnLeft = true;
            this._isOnAir = false;
        };
        this.warrior.runAction (cc.sequence (moveToLeft, cc.callFunc (enableMoveToRight, this)));
    },

    moveToRight (){
        this._isOnAir = true;
        var jumpToRight = cc.moveTo (this._speed, this.warriorRightPoint.x, this.warriorRightPoint.y);
        var rotateToRight = cc.scaleTo (this._speed, 8, -8);
        var moveToRight = cc.spawn (jumpToRight, rotateToRight);
        var enableMoveToLeft = function () {
            this._isOnLeft = false;
            this._isOnAir = false;
        }
        this.warrior.runAction (cc.sequence (moveToRight, cc.callFunc (enableMoveToLeft, this)));
    }
});
