var Enemy = cc.Class({
    name: 'Enemy',
    properties: {
        speed: {
            default: 1,
            type: cc.Float,
        },

        health: {
            default: 1,
            type: cc.Float,
        }

        

        
    },
    
    ctor () {

    }

});

module.exports = {Enemy};