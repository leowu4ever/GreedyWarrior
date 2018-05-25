var Spawner = cc.Class({
    name: 'Spawner',
    properties: {
        enemy: cc.Prefab,
        left: cc.Node,
        canvas: cc.Node,
    },

    ctor () {
        cc.log ("this is ctor??");
    },

    createEnemy () {
        var creation = cc.instantiate (this.enemy);
        //var scene = cc.director.getScene ();
        
        //find the correct parent for position

        creation.parent = this.canvas;
        creation.setPosition (this.left.x, this.left.y);
        cc.log("create");
        var moveAlongLeft = cc.moveTo (3, creation.x, 1100);
        creation.runAction (moveAlongLeft);
    },

    start () {
        cc.log("it starts to spawn an enenmy");
    },

    move () {
        
    }
});

module.exports = {Spawner};