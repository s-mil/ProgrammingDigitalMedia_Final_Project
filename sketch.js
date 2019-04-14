//arduino globals
var serial;
var portName = 'COM3';  // fill in your serial port name here
var inData = [];
var rawData;
var buttonN;
var buttonE;
var buttonS;
var buttonW;

//arduino boilerplate code
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
    console.log('the serial port opened.')
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
}

function draw() {

}