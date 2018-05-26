var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        chest: cc.Prefab,
        left: cc.Node,
        canvas: cc.Node,

        bat: cc.Prefab,
        warrior: cc.Node,
    },

    ctor () {
        cc.log ("this is ctor??");
    },

    createEnemy () {
        // create a chest
        var chest = cc.instantiate (this.chest);        
        chest.parent = this.canvas;
        chest.setPosition (this.left.x, this.left.y);
        var moveAlongLeft = cc.moveTo (3, chest.x, 1100);
        chest.runAction (moveAlongLeft);

        // create a bat, then fly upwards, 
        // stay in the mid and immediately create a warning
        // create arrow depending on warrior position
        // bat then explore
        // do sequence

        var bat = cc.instantiate (this.bat);
        bat.parent = this.canvas;
        bat.setPosition  (0, this.left.y);
        var moveAlongMid = cc.moveTo (4, 0, -300);
        bat.runAction (moveAlongMid);
        var warning = bat.getChildByName ("Bat_Spawn_Warning");
        warning.active = true;
        var arrow = bat.getChildByName ("Bat_Arrow");
        arrow.active = true;
        var fireArrow = cc.moveTo (1, this.warrior.x, this.warrior.y);
        // sequence
        








    },

    start () {
        cc.log("it starts to spawn an enenmy");
    },

    move () {
        
    }
});

module.exports = {Spawner};