let grassArr = []; // {}, {},{}
let grassEaterArr = []
let gazanikArr = []
let atomikBomb = []
let findArr = []
let atArr = []



let matrix = []
let n = 30
let arrX = []
let arrY = []
let side = 20

for (let i = 0; i < n; i++) {
  matrix[i] = []
  for (let j = 0; j < n; j++) {
    matrix[i][j] = 0
  }
}
  
for (let i = 0; i < n*n / 2; i++) {
  let randomX = Math.floor(Math.random() * n)
  let randomY = Math.floor(Math.random() * n)
  matrix[randomX][randomY] = 1
  arrX.push(randomX)
  arrY.push(randomY)
}
for (let i = 0; i < n*n / 50; i++) {
  let randomX = Math.floor(Math.random() * n)
  let randomY = Math.floor(Math.random() * n)
  for(let k = 0; k < arrX.length; k++){
    if(arrX[k] != randomX && arrY[k] != randomY){
      matrix[randomX][randomY] = 2
      arrX.push(randomX)
      arrY.push(randomY)
      if(k >  n*n / 4)
      {
        break;
      }
    }
  } 
}
for (let i = 0; i < n*n / 80; i++) {
  let randomX = Math.floor(Math.random() * n)
  let randomY = Math.floor(Math.random() * n)
  for(let k = 0; k < arrX.length; k++){
    if(arrX[k] != randomX && arrY[k] != randomY){
      matrix[randomX][randomY] = 3
      if(k >  n*n / 15)
      {
        break;
      }
    }
  }
}
for (let i = 0; i < n*n / 100; i++) {
  let randomX = Math.floor(Math.random() * n)
  let randomY = Math.floor(Math.random() * n)
  for(let k = 0; k < arrX.length; k++){
    if(arrX[k] != randomX && arrY[k] != randomY){
      matrix[randomX][randomY] = 5
      if(k >  n*n / 15)
      {
        break;
      }
    }
  }
}



function setup() {
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("grey");
  frameRate(1);
  for (var x = 0; x < matrix.length; x++) {
    for (var y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 1) {
        var gr = new Grass(x, y); // {this.x: 0, this.y: 2, }
        grassArr.push(gr);
      } else if (matrix[x][y] == 2) {
        var grEat = new GrassEater(x, y); // {this.x: 0, this.y: 2, }
        grassEaterArr.push(grEat);
      }
      else if (matrix[x][y] == 3) {
        var grEat = new Gazanik(x, y); // {this.x: 0, this.y: 2, }
        gazanikArr.push(grEat);
      }
      
      else if (matrix[x][y] == 5) {
        var finder = new bombFinder(x, y); 
        findArr.push(finder);
      }
    }
  }
}


function draw() {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 0) {
        fill("grey");
      } else if (matrix[x][y] == 1) {
        fill("green");
      } else if (matrix[x][y] == 2) {
        fill("yellow");
      } else if (matrix[x][y] == 3) {
        fill("red");
      } else if (matrix[x][y] == 4) {
        fill("orange");
      } else if (matrix[x][y] == 5) {
        fill('black')
      }
      rect(y * side, x * side, side, side);
    }
  }

  for (const i in grassArr) {
    grassArr[i].mul();
  }
  for (const i in grassEaterArr) {
    grassEaterArr[i].mul()
    grassEaterArr[i].eat();
  }
  for (const i in gazanikArr) {
    gazanikArr[i].eat()
  }

  if (gazanikArr.length >= 14 ) {
    var bomb = new atomicBomb()
    bomb.boom()
    for(let i in  atomikBomb){
      atomikBomb[i].gmp()
    }
  }
  for(const i in findArr){
    findArr[i].move()
    findArr[i].eat()
  }  
}
