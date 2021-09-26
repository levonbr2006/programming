var LivingCreature = require("./LiveForm");
var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var AtomicBomb = require("./AtomicBomb.js");
var Gazanik = require("./Gazanik.js");
var BombFinder = require("./bombFinder.js");
let random = require('./random');

module.exports = class AtomicBomb extends LivingCreature {
  //class atomicBomb extends LivingCreature{
  boom() {
    // gazanikArr = [[1, 2], [2, 3], [3, 1]]
    let i = Math.floor(Math.random() * gazanikArr.length) // {x, y}
    this.x = gazanikArr[i].x
    this.y = gazanikArr[i].y
    matrix[this.x][this.y] = 4
    gazanikArr.splice(i, 1)
    // console.log('We lost "Gazanik" in cordinates {x:' + this.x + ',y:' + this.y + '}')
    let bomb1 = new AtomicBomb(this.x, this.y)
    atomicBombArr.push(bomb1)
  }

  ifExists(bomb){
    for (let j = 0; j < atomicBombArr.length; j++) {
      if (atomicBombArr[j].x == bomb.x && atomicBombArr[j].y == bomb.y) {
        return true;
      }
    }
    return false;
  }

  gmp() {

    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      //matrix[x][y] = 4;
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        matrix[x][y] = 4
        let bomb1 = new AtomicBomb(x, y)
        if (!this.ifExists(bomb1)) {
          atomicBombArr.push(bomb1)
        }
        for (let j = 0; j < grassArr.length; j++) {
          if (grassArr[j].x == x && grassArr[j].y == y) {
            grassArr.splice(j, 1);
          }
        }
        for (let j = 0; j < grassEaterArr.length; j++) {
          if (grassEaterArr[j].x == x && grassEaterArr[j].y == y) {
            grassEaterArr.splice(j, 1);
          }
        }
        for (let j = 0; j < gazanikArr.length; j++) {
          if (gazanikArr[j].x == x && gazanikArr[j].y == y) {
            gazanikArr.splice(j, 1);
          }
        }
      }

    }
  }
}