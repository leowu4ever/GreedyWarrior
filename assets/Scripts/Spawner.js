const Wave = require('Wave').Wave;
// need to require enemy script


var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        chest: cc.Prefab,
        chestSpawnWarning: cc.Node,
        left: cc.Node,
        canvas: cc.Node,
        bat: cc.Prefab,
        warrior: cc.Node,
        wave: [Wave],   // enemy,numOfEnemy,enemyInterval,waveDelay
        leftSpawnPoint: cc.Node,
        rightSpawnPoint: cc.Node,

    },

    
    ctor () {
    
    },

    createAChest () {
        var chest = cc.instantiate (this.chest);        
        chest.parent = this.canvas;
        
        var randomNum = Math.random ();
        if (randomNum > 0.5) {
            chest.setPosition (this.leftSpawnPoint.x, this.leftSpawnPoint.y);

        } else {
            chest.setPosition (this.rightSpawnPoint.x, this.rightSpawnPoint.y);
            chest.setScale (5, -5);
        }
        var speed = chest.getComponent ("Chest").enemyProperty.speed;
        var moveUpwards = cc.moveBy (1/speed, 0, -this.rightSpawnPoint.y * 2); 
        chest.runAction (moveUpwards);
    },

    createBat () {
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

    createWave (numOfEnemy, numOfWave, enemyInterval, waveInterval) {
        
        this.canvas.runAction (cc.sequence (cc.callFunc (this.createChest, this), cc.delayTime (enemyInterval)).repeat (numOfEnemy));
        this.canvas.runAction (cc.sequence (cc.callFunc (this.createBat, this), cc.delayTime (enemyInterval)).repeat (numOfEnemy));
          
    },

    createWaves () {



    }

    

});

module.exports = {Spawner};