class GrassEater {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.directions = [];
      this.energy = 8;
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
  
    chooseCell(ch) {
      this.getNewCoordinates() // 
      var found = [];
      for (let i in this.directions) {
        let x = this.directions[i][0]
        let y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[x][y] == ch) {
            found.push(this.directions[i]);
          }
        }
      }
      return found;
    }
  
    move() {
      let emptyCell = this.chooseCell(0) // գտնի դատարկ վանդակները
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [1, 1]
      if (newCell && this.energy >= 0) { // գրենք էս երկու պայմանները
        this.energy-- // 
        let newX = newCell[0]; // 1
        let newY = newCell[1]; // 1
        matrix[newX][newY] = 2; // 2 // paint yellow cell
        matrix[this.x][this.y] = 0;
        this.x = newX // 2 = 1
        this.y = newY // 1 = 1
      }
      else if (this.energy < 0) {
        this.die();
      }
    }
    mul() {
      let emptyCell = this.chooseCell(0)
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell && this.energy >= 12) {
        let newX = newCell[0]; // 1
        let newY = newCell[1]; // 0
        matrix[newX][newY] = 2; // ներկում ենք
        let newGrassEater = new GrassEater(newX, newY)
        grassEaterArr.push(newGrassEater);
        this.energy -= 4;
      }
    }
    eat() {
      let emptyCell = this.chooseCell(1) // 
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell) {
        this.energy++
        let newX = newCell[0]; // 0
        let newY = newCell[1]; // 1
        matrix[newX][newY] = 2
        matrix[this.x][this.y] = 0;
  
  
        for (let i = 0; i < grassArr.length; i++) {
          if (grassArr[i].x == newX && grassArr[i].y == newY) {
            grassArr.splice(i, 1);
          }
        }
        this.x = newX;
        this.y = newY;
      }
      else {
        this.move();
      }
    }
  
    die() {
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < grassEaterArr.length; i++) {
        if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
          grassEaterArr.splice(i, 1);
        }
      }
    }
  }