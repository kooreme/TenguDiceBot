//dice.js
const COMMENT = /(#)/;
const DICE_ROLL = /^\d*?d\d+?/;

/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function(string) {
    var diceStrArray = string.split(COMMENT);
    console.log(diceStrArray);
    var str = checkDiceSentence(diceStrArray[0]);
    return 'diceroll! :' + str;
};


function checkDiceSentence(string) {
    var result = '';
    //基本ダイスロール
    if (DICE_ROLL.test(string)) {
        var splits = string.split(/([dp])/);
        console.log(splits);
        
        if(!isNaN(splits[2])) {
            if(splits[3] == null) {
                splits.push('');
            }
            var resArray = diceRoll(splits[0],splits[2]);
            
            switch(splits[3]) {
            case 'p' :
                result = '(' + resArray.join('+') + ') = ' + sum(resArray);
                break;
                
            default :
                result = '(' + resArray.join(',') + ')';
                break;
            }
        }
    }
    
    else {
        console.log('Error: string = ' + string);
        result = 'Error!'
    }
    
    return result;
}

function diceRoll(sum, diceMen) {
    var result = [];
    for(i = 0;i < sum;i++) {
        result.push(getRandomIntInclusive(1,diceMen));
    }
    return result;
};


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

function sum(arr) {
    return arr.reduce(function(prev, current, i, arr) {
        return prev+current;
    });
};
