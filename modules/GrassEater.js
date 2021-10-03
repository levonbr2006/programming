var LiveForm = require("./LiveForm");

let random = require('./random');


module.exports = class GrassEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
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
    mul() 
    {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell)
        {
            let x = newCell[0];
            let y = newCell[1];
            let grassEater = new GrassEater(x, y);
            console.log("bye")
            if (!this.ifExists(grassEater))
            {
                matrix[y][x] = 2;
                grassEaterArr.push(grassEater);
                this.life = 5;
            }
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);
        //console.log(this.life + "life")
       
        if(this.life <= 0)
        {
            this.die;
        }
        else if (newCell)
        {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];
            //console.log(matrix + "1")
            matrix[y][x] = 2; 
            grassEaterArr.push(new GrassEater(x, y))
            matrix[this.y][this.x] = 0;
            //console.log(matrix + "2")
            for (let i in grassArr) {
                 
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    //console.log(matrix[y][x]);
                  
                    grassArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 13) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move(){
        let emptyCells = []
        emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        
        if(newCell)
        {
            var x = newCell[0];
            var y = newCell[1];
            var newGrassEater1 = new GrassEater(x,y);
            //console.log(x, y)
        }
        //console.log('end')

        if (newCell && !this.ifExists(newGrassEater1) && this.life > 0) {
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            for(let i in grassEaterArr)
            {            

                if(grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y)
                {
                    console.log("hello");
                    //grassEaterArr.push(newGrassEater1)
                    grassEaterArr[i].x = x;
                    grassEaterArr[i].y = y;
                }
            }
            this.y = y;
            this.x = x;
            this.life--;
      }
    }
        //else
        /*{
            console.log(this.x, this.y)
            console.log('endf')
        }*/
        /*mul() {
            let emptyCells = super.chooseCell(0);
            let newCell = random(emptyCells);
    
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                let grassEater = new GrassEater(x, y);
                if (!this.ifExists(grassEater))
                {
                    matrix[y][x] = 2;
                    grassEaterArr.push(grassEater);
                    this.life = 5;
                }
            }
            if (weath == "winter") {
                this.energy -= 4;
                this.multiply -= 4;
            }
            if (weath == "summer") {
                this.energy += 2;
                this.multiply += 2;
            }
        }
        eat() {
            let emptyCells = super.chooseCell(1);
            let newCell = random(emptyCells);
            //console.log(this.life + "life")
            if(this.life <= 0)
            {
                this.die;
            }
            else if (newCell)
            {
    
                this.life++;
                let x = newCell[0];
                let y = newCell[1];
                //console.log(matrix + "1")
                //matrix[y][x] = 2;
                //matrix[this.y][this.x] = 0;
                //console.log(matrix + "2")
                matrix[y][x] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1)
                    }
                }
                this.x = x;
                this.y = y;
    
                if (this.life >= 13) {
                    this.mul();
                    this.life = 5
                }
            }
            else {
                this.move()
            }
        }
        move()
        {
            this.life--;
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            if(newCell)
            {
                var x = newCell[0];
                var y = newCell[1];
                var newGrassEater = new GrassEater(x,y);
                //console.log(x, y)
            }
            //console.log('end')
    
            if (newCell && !this.ifExists(newGrassEater) && this.life > 0) {
                matrix[y][x] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                /*for(let i in grassEaterArr)
                {
                    if(grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y)
                    {
                        grassEaterArr[i].x = x;
                        grassEaterArr[i].y = y;
                    }
                }*/
    /*            this.y = y;
                this.x = x;
            }    
            if (this.life <= 0) {
                this.die();
            }
        
    }*/
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
    }
    ifExists(grass)
    {
        for (let j = 0; j < grassEaterArr.length; j++) {
          if (grassEaterArr[j].x == grass.x && grassEaterArr[j].y == grass.y) {
            return true;
          }
        }
        return false;
    }      
}