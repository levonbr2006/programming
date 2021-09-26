var LiveForm = require("./LiveForm");
var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var AtomicBomb = require("./AtomicBomb.js");
var Gazanik = require("./Gazanik.js");
var BombFinder = require("./bombFinder.js");
let random = require('./random');

module.exports = class Grass extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        
        if (newCell && this.multiply >= 2) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            if (!this.ifExists(grass))
            {
                grassArr.push(grass);
                this.multiply = 0;
            }
        }
    }
    ifExists(grass){
        for (let j = 0; j < grassArr.length; j++) {
          if (grassArr[j].x == grass.x && grassArr[j].y == grass.y) {
            return true;
          }
        }
        return false;
      }    
}