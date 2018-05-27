var Wave = cc.Class({
    name: "Wave",
    properties: {
        enemy: cc.Prefab,
        numOfEnemy: {
            default: 1,
            type: cc.Float,
        },
        enemyInterval: {
            default: 1,
            type: cc.Float,
        }
        ,
        waveDelay: {
            default: 1,
            type: cc.Float,
        },
    },

});

module.exports = {Wave};
