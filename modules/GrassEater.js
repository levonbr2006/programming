var LiveForm = require("./LiveForm");

let random = require('./random');


module.exports = class GrassEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 5;
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
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];
            matrix[x][y] = 2;
            let grassEater = new GrassEater(x, y);
            if (!this.ifExists(grassEater)) {

                grassEaterArr.push(grassEater);
                this.life = 5;
            }
        }
    }
    eat() {
        if (this.life <= 0) {
            this.die();
        }
        else {
            let emptyCells = this.chooseCell(1);
            let newCell = random(emptyCells);

            if (newCell) {

                this.life++;
                let x = newCell[0];
                let y = newCell[1];

                matrix[x][y] = 2;
                for (let i in grassArr) {

                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1)
                    }
                }

                matrix[this.x][this.y] = 0;
                for (let i in grassEaterArr) {

                    if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                        grassEaterArr[i].x = x;
                        grassEaterArr[i].y = y;
                    }
                }

                this.x = x;
                this.y = y;

                if (this.life >= 10) {
                    this.mul();
                }
            }
            else {
                this.move()
            }
        }
    }

    move() {

        this.life--;
        if (this.life <= 0) {
            this.die();
        }
        else {
            let emptyCells = []
            emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);

            if (newCell) {

                var x = newCell[0];
                var y = newCell[1];

                if (this.life > 0) {

                    matrix[x][y] = 2;
                    matrix[this.x][this.y] = 0;
                    for (let i in grassEaterArr) {

                        if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {

                            grassEaterArr[i].x = x;
                            grassEaterArr[i].y = y;
                        }
                    }
                    this.y = y;
                    this.x = x;
                }
            }
        }
    }

    die() {
        matrix[this.x][this.y] = 0;
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {

                grassEaterArr.splice(i, 1)
            }
        }
    }

    ifExists(grass) {
        for (let j = 0; j < grassEaterArr.length; j++) {
            if (grassEaterArr[j].x == grass.x && grassEaterArr[j].y == grass.y) {
                return true;
            }
        }
        return false;
    }
}