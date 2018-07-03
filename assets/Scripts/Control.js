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
        _swipeThreshold: 100, //how much finger needs to move to trigger swiping
        _touchCount: 0,
        _touchTimesThreshold: 3,
        _touchGapThreshold: 1000, //in mili second
        _lastTouchTime: 0,
        _lastTouchPos: cc.v2 (0, 0),
        _touchPosAreaThreshold: 30,
        _isTouchFinished: true,
    },

    onLoad () {
        this._speed = 1/this.speed;
        this.node.on ("touchmove", this.move, this);
        this.node.on ("touchstart", this.touchStart, this);
        this.node.on ("touchstart", this.defend, this);
        this.node.on ("touchend", this.touchEnd, this);
    },
    
    touchStart () {
        this._isTouchFinished = false;
    },

    touchEnd () {
        this._isTouchFinished = true;
    },

    setTouchFinish () {

        this._isTouchFinished = true;
    },


    defend (event) {
        // also check region
        // check if it is on shield 
        // GM  
        //console.clear (); 
        var curTouchPos = event.getTouches ()[0].getLocation ();
        var curTouchTime = Date.now ();
        cc.log (curTouchPos);
        cc.log (this._lastTouchPos);
        if (this.compareTwoPos (curTouchPos, this._lastTouchPos) || (this._lastTouchPos.x == 0 && this._lastTouchPos.y == 0)) {
            if (this._touchCount == 0 && this._lastTouchTime == 0) {
                this._touchCount++;
                this._lastTouchTime = curTouchTime;
                this._lastTouchPos = curTouchPos;
                cc.log ("first touch");
                cc.log (this._touchCount);
    
            } else {
                var touchGap = curTouchTime - this._lastTouchTime;
                cc.log (touchGap + " " + this._touchGapThreshold);
                if (touchGap < this._touchGapThreshold) {
                    this._touchCount++;
                    this._lastTouchTime = curTouchTime;
                    this._lastTouchPos = curTouchPos;
                    cc.log ("next touch within gap");
                    cc.log (this._touchCount);
    
                } else {
                    this._touchCount = 0;
                    this._lastTouchTime = 0;
                    this._lastTouchPos = cc.v2 (0, 0);
                    cc.log ("next touch without gap");
                    cc.log (this._touchCount);
                }
            }
    
            if (this._touchCount == this._touchTimesThreshold) {
                this._touchCount = 0;
                this._lastTouchTime = 0;
                this._lastTouchPos = cc.v2 (0, 0);

                var warriorComponent = this.warrior.getComponent ("Warrior");
                // call show shield
                warriorComponent.showShield ();
                warriorComponent.scheduleOnce (function () {
                    warriorComponent.hideShield ();
                }, warriorComponent.shieldDuration);
                cc.log ("hit the maximum touch");
            }
        } else {
            this._touchCount = 1;
            this._lastTouchTime = curTouchTime;
            this._lastTouchPos = curTouchPos;
            cc.log ("new first touch");
            cc.log (this._touchCount);
        }
    },

    compareTwoPos (curTouchPos, lastTouchPos) {
        if (curTouchPos.x < lastTouchPos.x + this._touchPosAreaThreshold && curTouchPos.x > lastTouchPos.x - this._touchPosAreaThreshold) {
            if (curTouchPos.y < lastTouchPos.y + this._touchPosAreaThreshold && curTouchPos.y > lastTouchPos.y - this._touchPosAreaThreshold) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    
    move (event) {
        if (!this._isTouchFinished) {
            cc.log ("swipe");
            var gm = cc.find ("Utility/Game Manager").getComponent("GameManager");
            var startTouch = event.getTouches ()[0].getStartLocation ();
            var curTouch = event.getTouches ()[0].getLocation ();
            var xDif = curTouch.x - startTouch.x;
            var yDif = curTouch.y - startTouch.y;
    
            if (!gm.getGameState ()) {
                if (!this._isOnAir) {
                    if (this._isOnLeft) {
                        if (!this._isInverted) {    // not inverted
                            if (xDif > this._swipeThreshold) {
                                // left & swiping right
                                this.moveToRight ();
                            } else if (xDif < -this._swipeThreshold) {
                                // left & swiping left
                                //this.moveToLeft ();
                            }
                        } else {    // inverted
                            if (xDif > this._swipeThreshold) {
                                // left & swiping right
                                //this.moveToLeft ();
                             
                            } else if (xDif < -this._swipeThreshold) {
                                this.moveToRight ();
                            }
                        }    
                    } else {
                        if (!this._isInverted) {
                            if (xDif > this._swipeThreshold) {
                                //this.moveToLeft ();
                             
                            } else if (xDif < -this._swipeThreshold) {
                                this.moveToLeft ();
                            }
                        } else {
                            if (xDif > this._swipeThreshold) {
                                this.moveToLeft ();
                             
                            } else if (xDif < -this._swipeThreshold) {
                                //this.moveToLeft ();
                            }
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
        this.setTouchFinish ();
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
        this.setTouchFinish ();
    }
});
