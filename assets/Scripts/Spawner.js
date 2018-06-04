const Wave = require('Wave').Wave;
// need to require enemy script

var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        chest: cc.Prefab,
        canvas: cc.Node,
        bat: [cc.Prefab],
        warrior: cc.Node,
        wave: [Wave],   // enemy,numOfEnemy,enemyInterval,waveDelay
        leftSpawnPoint: cc.Node,
        rightSpawnPoint: cc.Node,
        leftWarning: cc.Node,
        rightWarning: cc.Node,
        chestShowUpDelay: 0.3,
        warriorLeftPoint: cc.Node,
        warriorRightPoint: cc.Node,

    },
    
    ctor () {
        //this.hidePointNodes ();
    },

    hidePointNodes () {
        this.leftSpawnPoint.opacity = 0;
        this.rightSpawnPoint.opacity = 0;
        this.leftWarning.opacity = 0;
        this.rightWarning.opacity = 0;
        this.warriorLeftPoint.opacity = 0;
        this.warriorRightPoint.opacity = 0;
    },

    createAChest () {
        var chest = cc.instantiate (this.chest);    // dont keep instantiate            
        chest.parent = this.canvas;
        
        var randomNum = Math.random ();
        var flashWarning = cc.sequence (cc.fadeTo (0.3, 255), cc.fadeTo (0.1, 0));
        if (randomNum > 0.5) {
            this.leftWarning.runAction (flashWarning);
            chest.setPosition (this.leftSpawnPoint.x, this.leftSpawnPoint.y);

        } else {
            this.rightWarning.runAction (flashWarning);
            chest.setPosition (this.rightSpawnPoint.x, this.rightSpawnPoint.y);
            chest.setScale (5, -5);
        }
        
        var speed = chest.getComponent ("Chest").enemyProperty.speed;
        var moveUpwards = cc.sequence (cc.delayTime (1), cc.moveBy (1/speed, 0, -this.rightSpawnPoint.y*2)); 
        
        chest.runAction (moveUpwards);
    },

    createABat (color) { // white 0, black 1
        var bat = cc.instantiate (this.bat[0]);
        bat.parent = this.canvas;
        bat.setPosition  (0, this.leftSpawnPoint.y);

        var speed = 1/bat.getComponent ("Bat").enemyProperty.speed;
        var weaponSpeed = bat.getComponent ("Bat").weaponSpeed;
        var moveUpwards = cc.moveBy (speed, 0, cc.visibleRect.height/3);

        var flashWarningCallback = function () {
            // show warning according to play position

            var warriorWorldPos = this.warrior.getParent ().convertToWorldSpaceAR (this.warrior.getPosition());
            var warriorNodePos = bat.convertToNodeSpaceAR (warriorWorldPos);
            
            if (warriorNodePos.x < 0) {
                var warning = bat.getChildByName ("Bat Left Warning");
                var weapon = bat.getChildByName ("Bat Left Weapon");

                var warriorLeftWorldPos = this.warrior.getParent ().convertToWorldSpaceAR (this.warriorLeftPoint.getPosition());
                var warriorLeftPoint = bat.convertToNodeSpaceAR (warriorLeftWorldPos);
                var fireWeapon = cc.moveTo (weaponSpeed, warriorLeftPoint.x, warriorLeftPoint.y);

            } else {
                var warning = bat.getChildByName ("Bat Right Warning");
                var weapon = bat.getChildByName ("Bat Right Weapon");

                var warriorRightWorldPos = this.warrior.getParent ().convertToWorldSpaceAR (this.warriorRightPoint.getPosition());
                var warriorRightPoint = bat.convertToNodeSpaceAR (warriorRightWorldPos);

                var fireWeapon = cc.moveTo (weaponSpeed, warriorRightPoint.x, warriorRightPoint.y);

            }


            var showAndFireWeapon = function () {
                var hideBatAndWeapon = function () {
                    cc.log ("hide");
                    bat.runAction (cc.fadeTo(0.5, 0));
                };


                var showArrow = cc.fadeTo(0.1, 255); 
                var sequence = cc.sequence (showArrow, fireWeapon, cc.callFunc (hideBatAndWeapon, this));
                weapon.runAction(sequence);
                             

            };


            var flashWarning = cc.sequence (cc.fadeTo (0.2, 255), cc.fadeTo (1, 0), cc.callFunc (showAndFireWeapon, this));
            warning.runAction (flashWarning);

        }


        bat.runAction (cc.sequence (moveUpwards, cc.callFunc (flashWarningCallback, this)));
    },

});

module.exports = {Spawner};