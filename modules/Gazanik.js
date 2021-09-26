var LivingCreature = require("./LiveForm");
var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var AtomicBomb = require("./AtomicBomb.js");
var Gazanik = require("./Gazanik.js");
var BombFinder = require("./bombFinder.js");
let random = require('./random');

module.exports = class Gazanik extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 12;
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

  move() {
    let emptyCell1 = this.chooseCell(1) // [green cells]
    let emptyCell0 = this.chooseCell(0) // [empty Cells]  
    let arr = [...emptyCell1, ...emptyCell0] // [ 0, 1,0 1, 0, 1]
    let newCell = arr[Math.floor(Math.random() * arr.length)]; // [1]
    if(newCell){
      var newX = newCell[0];
      var newY = newCell[1];
    }
    let newGazanik = new Gazanik(newX, newY)
    if (newCell && this.energy >= 0 && !this.ifExists(newGazanik)) {
      this.energy--;
      if (matrix[newX][newY] == 0)
      {
        matrix[newX][newY] = 3
        matrix[this.x][this.y] = 0;
      }
       else if (matrix[newX][newY] == 1)
      {
        matrix[newX][newY] = 3
        matrix[this.x][this.y] = 1;
      }
      for(let i in gazanikArr)
      {
        if(gazanikArr[i].x == this.x && gazanikArr[i].y == this.y)
        {
          gazanikArr[i].x == newX;
          gazanikArr[i].y == newY;
        }
      }
      this.x = newX
      this.y = newY
      // x = newX
      // y = newY
    }
    else if (this.energy < 0) {
      this.die();
    }
  }
  mul() {
    let emptyCells = this.chooseCell(0)
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (newCell && this.energy >= 15) {
      let newX = newCell[0];
      let newY = newCell[1];     
      let newGazanik = new Gazanik(newX, newY)
      if(!this.ifExists(newGazanik))
      {
        matrix[newX][newY] = 3;
        gazanikArr.push(newGazanik);
        this.energy = 8;
      }
    }
  }
  eat() {
    this.mul()
    let emptyCell = this.chooseCell(2)
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell) {
      this.energy += 2
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 3;
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < grassEaterArr.length; i++) {
        if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
          grassEaterArr.splice(i, 1);
        }
      }
      this.x = newX
      this.y = newY
    }
    else {
      this.move();
    }
  }
  die() {
    matrix[this.x][this.y] = 0;
    for (let i = 0; i < gazanikArr.length; i++) {
      if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
        gazanikArr.splice(i, 1);
      }
    }
  }
  ifExists(gazan)
  {
      for (let j = 0; j < gazanikArr.length; j++) {
        if (gazanikArr[j].x == gazan.x && gazanikArr[j].y == gazan.y) {
          return true;
        }
      }
      return false;
  }
}
