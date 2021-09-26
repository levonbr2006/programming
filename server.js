var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var AtomicBomb = require("./modules/AtomicBomb.js");
var Gazanik = require("./modules/Gazanik.js");
var BombFinder = require("./modules/bombFinder.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
atomicBombArr = [];
gazanikArr = [];
bombFinderArr = [];
matrix = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, atomicBomb, gazanik, bombFinder) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < atomicBomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < gazanik; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < bombFinder; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 10, 10, 5 , 15, 3);
//console.log(matrix)
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
// const bombFinder = require("./modules/bombFinder.js");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                
            }
            else if (matrix[y][x] == 4) {
                var atomicBomb = new AtomicBomb (x, y);
                atomicBombArr.push(atomicBomb);
            }
            else if (matrix[y][x] == 3) {
                var gazanik = new Gazanik(x, y);
                gazanikArr.push(gazanik);
            }
            else if (matrix[y][x] == 5) {
                var bombFinder = new BombFinder(x, y);
                bombFinderArr.push(bombFinder);
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (let i in grassArr) {
            grassArr[i].mul();
        }
    }
    // if (grassArr[0] !== undefined) {
    //     grassArr.mul();
    // }
    if (grassEaterArr[0] !== undefined) {
        for (let i in grassEaterArr) {
            grassEaterArr[i].eat();

        }
    }
    if (gazanikArr[0] !== undefined) {
        for (let i in gazanikArr) {
            gazanikArr[i].eat();
        }
    }/*
    if (atomicArr[0] !== undefined) {
        for (var i in atomicArr) {
            //atomicArr[i].boom();
            atomicBombArr[i].gmp();
            //gazanikArr[i].move();
            //gazanikArr[i].die();
            //console.log(gazanikArr)
        }
    }*/
    if (bombFinderArr[0] !== undefined) {
        for (let i in bombFinderArr) {
            bombFinderArr[i].eat();
        }
    }
    if (gazanikArr.length >= 14 ) {
        var bomb = new AtomicBomb()
        bomb.boom()
        for(let i in  atomicBombArr){
            atomicBombArr[i].gmp()
        }
    }
    // if (gazanikArr.length >= 14 ) {
    //     var bomb = new AtomicBomb()
    //     bomb.boom()
    //     //bomb.gmp()
    //     //atomicBombArr.gmp()
    // }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        gazanCounter:gazanikArr.length,
        atomicCounter: atomicBombArr.length,
        bombFinder: bombFinderArr.length,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)