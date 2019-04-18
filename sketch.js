//-----------arduino globals---------------
var serial;
var portName = 'COM3';
var inData = [];
var rawData;
var buttonN;
var buttonE;
var buttonS;
var buttonW;

//-------------SNAKE GAME GLOBALS-----------
let numSegments = 10;
let direction = 'east';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;

//-----------arduino boilerplate code----------
// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.');
}

function serialEvent() {
    rawData = String(serial.readLine());
    rawData = rawData.split(",");
    if (rawData.length > 2) {
        inData = rawData;
        for (var i = 0; i < inData.length; i++) { inData[i] = parseInt(inData[i], 10); }
    }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}

//-------------------------------------------------

function setup() {

    serial = new p5.SerialPort();            // make a new instance of the serialport library
    serial.on('list', printList);            // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);             // callback for the port opening
    serial.on('data', serialEvent);          // callback for when new data arrives
    serial.on('error', serialError);         // callback for errors
    serial.on('close', portClose);           // callback for the port closing
    var options = { baudrate: 9600 };        // set baud rate to 9600
    serial.list();                           // list the serial ports
    serial.open(portName, options);          // open a serial port
    //--------Game Setup--------------------
    scoreElem = createDiv('Score = 0');
    scoreElem.position(20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');

    createCanvas(500, 500);
    frameRate(15);
    stroke(255);
    strokeWeight(10);
    updateFruitCoordinates();

    for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + i * diff);
        yCor.push(yStart);
    }
}

function draw() {

    background(0);
    updateDirection();
    for (let i = 0; i < numSegments - 1; i++) {
        line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }
    updateSnakeCoordinates();
    checkGameStatus();
    checkForFruit();
}

function updateSnakeCoordinates() {
    for (let i = 0; i < numSegments - 1; i++) {
        xCor[i] = xCor[i + 1];
        yCor[i] = yCor[i + 1];
    }
    switch (direction) {
        case 'east':
            xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
            yCor[numSegments - 1] = yCor[numSegments - 2];
            break;
        case 'north':
            xCor[numSegments - 1] = xCor[numSegments - 2];
            yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
            break;
        case 'west':
            xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
            yCor[numSegments - 1] = yCor[numSegments - 2];
            break;
        case 'south':
            xCor[numSegments - 1] = xCor[numSegments - 2];
            yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
            break;
    }
}

function checkGameStatus() {
    if (
        xCor[xCor.length - 1] > width ||
        xCor[xCor.length - 1] < 0 ||
        yCor[yCor.length - 1] > height ||
        yCor[yCor.length - 1] < 0 ||
        checkSnakeCollision()
    ) {
        noLoop();
        const scoreVal = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Game Over \n Score : ' + scoreVal);
    }
}

function checkSnakeCollision() {
    const snakeHeadX = xCor[xCor.length - 1];
    const snakeHeadY = yCor[yCor.length - 1];
    for (let i = 0; i < xCor.length - 1; i++) {
        if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
            return true;
        }
    }
}

function checkForFruit() {
    point(xFruit, yFruit);
    if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
        const prevScore = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Score = ' + (prevScore + 1));
        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
        numSegments++;
        updateFruitCoordinates();
    }
}

function updateFruitCoordinates() {
    xFruit = floor(random(10, (width - 100) / 10)) * 10;
    yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function updateDirection() {
    if (inData[0] == 1 && direction !== 'east') {
        direction = 'west';
    }

    else if (inData[1] == 1 && direction !== 'west') {
        direction = 'east';
    }

    else if (inData[2] == 1 && direction !== 'south') {
        direction = 'north';
    }

    else if (inData[3] == 1 && direction !== 'north') {
        direction = 'south';
    }
}
