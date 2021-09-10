class atomicBomb {
    constructor(x, y) {
      this.x = x
      this.y = y
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
    boom() {
      // gazanikArr = [[1, 2], [2, 3], [3, 1]]
      let i = Math.floor(Math.random() * gazanikArr.length) // {x, y}
      this.x = gazanikArr[i].x
      this.y = gazanikArr[i].y
      matrix[this.x][this.y] = 4
      gazanikArr.splice(i, 1)
      console.log('We lost "Gazanik" in cordinates {x:' + this.x + ',y:' + this.y + '}')
      let bomb1 = new atomicBomb(this.x, this.y)
      atomikBomb.push(bomb1)
    }
    
    gmp() {
      console.log('gmp');
      
      for (let i in this.directions) {
        let x = this.directions[i][0]
        let y = this.directions[i][1];
        matrix[x][y] = 4
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          matrix[x][y] = 4
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