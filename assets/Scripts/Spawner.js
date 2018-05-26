var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        chest: cc.Prefab,
        left: cc.Node,
        canvas: cc.Node,

        bat: cc.Prefab,
        warrior: cc.Node,
        test1: cc.Node,
    },

    ctor () {
        cc.log ("this is ctor??");

    },

    createEnemy () {
        // create a chest
        cc.log ("test1 node space position" + this.test1.getParent ().convertToWorldSpace (this.test1.getPosition()));
        cc.log ("test1 position" + this.test1.getPosition ());

        var chest = cc.instantiate (this.chest);        
        chest.parent = this.canvas;
        chest.setPosition (this.left.x, this.left.y);
        var moveAlongLeft = cc.moveTo (3, chest.x, 1100);
        chest.runAction (moveAlongLeft);

        // create a bat, then fly upwards, 
        // stay in the mid and immediately create a warning
        // create arrow depending on warrior positions
        // bat then explore
        // do sequence

        var bat = cc.instantiate (this.bat);
        bat.parent = this.canvas;
        bat.setPosition  (0, this.left.y);

        var moveAlongMid = cc.moveTo (1, 0, -300);

        var warning = bat.getChildByName ("Bat_Arrow_Warning");
        var showWarning = cc.fadeTo (0.1, 255);

        
       
        // sequence
        
        var callbackTest = function () {
            warning.runAction (showWarning);
        }

        var callbackTest2 = function () {
            var arrow = bat.getChildByName ("Bat_Arrow");
            var showArrow = cc.fadeTo(0.1, 255); 
            // get warrior position
            // convert warrior position based on bat (parent)
            var warriorWorldPos = this.warrior.getParent ().convertToWorldSpaceAR (this.warrior.getPosition());
            var warriorNodePos = bat.convertToNodeSpaceAR (warriorWorldPos);
            cc.log (warriorNodePos);

            

            var fireArrow = cc.moveTo (2, warriorNodePos.x, warriorNodePos.y);
            
            var sequence = cc.sequence (showArrow, fireArrow);
            arrow.runAction(sequence);
        }
        
        bat.runAction (cc.sequence (moveAlongMid, cc.callFunc (callbackTest, this), cc.callFunc (callbackTest2, this)));
    },





    start () {
        cc.log("it starts to spawn an enenmy");


    },

    move () {
        
    }
});

module.exports = {Spawner};