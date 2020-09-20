/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const error = require('./errormessage')
const util = require('./util.js');
const Log = require('./log.js');
const datatable = require('./kt_datatable');
const DiceRoll = require('./diceroll');

class KTDiceRoll extends DiceRoll.DiceRoll {
    constructor(string){
        super(string,datatable);
    }
    normalDiceRoll() {
        let diceinfo = {};
        this.string = this.checkTable(this.string,this.datatable);
       
        diceinfo = super.normalDiceRoll();
        if (diceinfo == null) {
            return error.replyErrorMessage();
        }
    
        if (diceinfo.dice.length === 0) {
            Log.prints('no dice error');
            return diceinfo.comment;
        }
    
        Log.prints('diceinfo : ' + diceinfo);
        let returnString = this.createOutput(diceinfo.dice,diceinfo.comment);
    
        returnString += this.addTableOutput(diceinfo);
        Log.prints('returnString : ' + returnString);
    
        return returnString;
    }

    addTableOutput(diceinfo) {
        let returnString = '';
        const checkDataTable = datatable.dataTable[diceinfo.comment];
    
        if (checkDataTable) {
            if (checkDataTable.d66Option) {
                Log.prints('addTableOutput diceinfo.dice[0].resArray[0]&resArray[1] :' +  diceinfo.dice[0].resArray[0] + ',' +  diceinfo.dice[0].resArray[1]);
                const array = util.sort(diceinfo.dice[0].resArray);
                const d66 = Number(String(array[0]) + String(array[1]));
                Log.prints('addTableOutput d66 :' +  d66);
                returnString += '\n\n' + datatable.dataTable[diceinfo.comment].data[d66];
            }
            else {
                returnString += '\n\n'  + datatable.dataTable[diceinfo.comment].data[Number(diceinfo.dice[0].sum)];
            }
        }
    
        return returnString;
    }
    
    checkTable(string,datatable) {
        let returnString = '';

        const checkDataTable = datatable.dataTable[string];
        Log.prints('*******************************************************');
        Log.prints('string = ' + string);
        Log.prints('*******************************************************');

        Log.printsDir('checkDataTable =' + checkDataTable);
    
        if (checkDataTable) {
            Log.prints('*******************************************************');

            returnString = checkDataTable.dice + '#' + string;
        }
        else {
            returnString = string;
        }
        Log.prints('returnString =' + returnString);
        return returnString;
    }
}

module.exports.KTDiceRoll = KTDiceRoll;