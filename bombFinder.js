class bombFinder extends LivingCreature{
  constructor(x,y, index){
    super(x,y, index);
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

  chooseCell(character){
      this.getNewCoordinates();
      return super.chooseCell(character);
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
