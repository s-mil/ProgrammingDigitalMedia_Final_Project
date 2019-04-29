// The arduino code for controlling the snake game

//Assigning pins to buttons

const int NORTH = 11;
const int EAST = 13;
const int SOUTH = 12;
const int WEST = 10;
const int bg = A1;

int mappedAI = 0;
int rawAI = 0;

unsigned long debounceDelay = 50;

//NORTH setup
int lastNORTHState = 0;
int NORTHState = 0;
unsigned long lastNORTHDebounceTime = 0;

//EAST setup
int lastEASTState = 0;
int EASTState = 0;
unsigned long lastEASTDebounceTime = 0;

//SOUTH setup
int lastSOUTHState = 0;
int SOUTHState = 0;
unsigned long lastSOUTHDebounceTime = 0;

//WEST setup
int lastWESTState = 0;
int WESTState = 0;
unsigned long lastWESTDebounceTime = 0;

void setup()
{
    // open the serial connection
    Serial.begin(9600);
    Serial.setTimeout(10);

    // setup the input pins
    pinMode(NORTH, INPUT);
    pinMode(EAST, INPUT);
    pinMode(SOUTH, INPUT);
    pinMode(WEST, INPUT);
    pinMode(bg, INPUT);
}

void loop()
{
    // Read each button
    readNORTH();
    readSOUTH();
    readEAST();
    readWEST();

    rawAI = analogRead(bg);
    mappedAI = (abs(map(rawAI, 0, 1023, 0, 255)));

    // Send the information down the serial connection
    Serial.print(NORTHState);
    Serial.print(',');
    Serial.print(EASTState);
    Serial.print(',');
    Serial.print(SOUTHState);
    Serial.print(',');
    Serial.print(WESTState);
    Serial.print(',');
    Serial.print(mappedAI);
    Serial.println('');

    // wait 10 ms
    delay(10);
}

// For each button a function exists to check its value with a debounceDelay.
void readNORTH()
{
    int reading = digitalRead(NORTH);

    if (reading != lastNORTHState)
    {
        lastNORTHDebounceTime = millis();
    }
    if ((millis() - lastNORTHDebounceTime) > debounceDelay)
    {
        if (reading != NORTHState)
        {
            NORTHState = reading;
        }
    }
    lastNORTHState = reading;
}

void readWEST()
{
    int reading = digitalRead(WEST);

    if (reading != lastWESTState)
    {
        lastWESTDebounceTime = millis();
    }
    if ((millis() - lastWESTDebounceTime) > debounceDelay)
    {
        if (reading != WESTState)
        {
            WESTState = reading;
        }
    }
    lastWESTState = reading;
}

void readEAST()
{
    int reading = digitalRead(EAST);

    if (reading != lastEASTState)
    {
        lastEASTDebounceTime = millis();
    }
    if ((millis() - lastEASTDebounceTime) > debounceDelay)
    {
        if (reading != EASTState)
        {
            EASTState = reading;
        }
    }
    lastEASTState = reading;
}

void readSOUTH()
{
    int reading = digitalRead(SOUTH);

    if (reading != lastSOUTHState)
    {
        lastSOUTHDebounceTime = millis();
    }
    if ((millis() - lastSOUTHDebounceTime) > debounceDelay)
    {
        if (reading != SOUTHState)
        {
            SOUTHState = reading;
        }
    }
    lastSOUTHState = reading;
}