//-----------arduino globals---------------
var serial;
var portName = 'COM6';
var inData =  [0,0,0,0,255];
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

// array of segment coordinates
let xCor = [];
let yCor = [];
// for the fruit
let xFruit = 0;
let yFruit = 0;

// the score element object
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
    rawData = serial.readStringUntil('\n');
    rawData = rawData.split(","); 
    if (rawData.length > 2) {
        inData = rawData;
        for (var i = 0; i < inData.length; i++) 
            { inData[i] = parseInt(inData[i], 10); }
    }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}

// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

//-------------------------------------------------
function preload() {
    // sourced from https://freesound.org/people/Timbre/sounds/462631/#
    player = new Tone.Player({
        "url": "./Audio/loop.mp3",
        "loop": "true",
        "autostart": true,
        "volume": "-25"
    }).toMaster();
    player.loop = true;

}

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
    scoreElem = createDiv('Score = 0'); // html to setup a score display
    scoreElem.position(20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');

    // standard p5 prelude
    createCanvas(500, 500); 
    frameRate(15);  // framerate at 15 for optimal animation
    stroke(255);
    strokeWeight(10);
    fruitSpawn(); // spawn the first fruit

    // spawn snake
    for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + i * diff);
        yCor.push(yStart);
    }

    membrane = new Tone.MembraneSynth({
        pitchDecay: .01,
        octaves: 4,
        oscillator: {
            type: 'sine'
        },
        envelope: {
            attack: 0.1,
            decay: 0.4,
            sustain: 0.01,
            release: 1.4,
            attackCurve: 'exponential'
        },
        volume: -20
    }).toMaster();
}

function draw() {

    background(0); // black background
    updateDirection(); // check if the direction is now different
    for (let i = 0; i < numSegments - 1; i++) { // draw the snake
        line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }
    snakeMove(); // update the snakes position
    gameState(); // check if the game is over
    checkForFruit(); // check if the snake has eaten a fruit this tick
    //stroke(inData[4]);
}

// move the snake in the proper direction
function snakeMove() {
    for (let i = 0; i < numSegments - 1; i++) {
        xCor[i] = xCor[i + 1];
        yCor[i] = yCor[i + 1];
    }
    console.log(direction);
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

function gameState() {
    // If the snake has collided end the game and display a game over
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


// Check if the snake has eaten itself 
function checkSnakeCollision() {
    const snakeHeadX = xCor[xCor.length - 1];
    const snakeHeadY = yCor[yCor.length - 1];
    for (let i = 0; i < xCor.length - 1; i++) {
        if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
            return true;
        }
    }
}
/*
 Check if the snake head collided with the fruit
*/
function checkForFruit() {
    point(xFruit, yFruit);
    if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
        const prevScore = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Score = ' + (prevScore + 1));
        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
        numSegments++;
        fruitSpawn();
        membrane.triggerAttackRelease("F4", "8n");
    }
}


// move the fruit object to a new random location
function fruitSpawn() {
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
