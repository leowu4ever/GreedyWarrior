var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        chest: cc.Prefab,
        left: cc.Node,
        canvas: cc.Node,
    },

    ctor () {
        cc.log ("this is ctor??");
    },

    createEnemy () {
        // create a chest
        var creation = cc.instantiate (this.chest);        
        creation.parent = this.canvas;
        creation.setPosition (this.left.x, this.left.y);
        cc.log("create");
        var moveAlongLeft = cc.moveTo (3, creation.x, 1100);
        creation.runAction (moveAlongLeft);

        // create a bat
        //




    },

    start () {
        cc.log("it starts to spawn an enenmy");
    },

    move () {
        
    }
});

module.exports = {Spawner};