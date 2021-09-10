class bombFinder {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.directions = [];
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
    this.getNewCoordinates()
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
    let emptyCell1 = this.chooseCell(1) // [green cells]
    let emptyCell0 = this.chooseCell(0) // [empty Cells]  
    let arr = [...emptyCell1, ...emptyCell0] // [ 0, 1,0 1, 0, 1]
    let newCell = arr[Math.floor(Math.random() * arr.length)]; // [1]
    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];
      if (matrix[newX][newY] == 0) {
        matrix[newX][newY] = 5
        matrix[this.x][this.y] = 0;
      } else if (matrix[newX][newY] == 1) {
        matrix[newX][newY] = 5
        matrix[this.x][this.y] = 1;
      }
      this.x = newX
      this.y = newY
    }
  }
  eat() {
    let emptyCell = this.chooseCell(4)
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 5;
      matrix[this.x][this.y] = 0;
      for (let i in atArr) {
        if (atArr[i].x == newX && atArr[i].y == newY) {
          atArr.splice(i, 1);
        }
      }
      this.x = newX
      this.y = newY
    }
  }
}
