// The arduino code for controlling the snake game

//Assigning pins to buttons

const int NORTH = 5;
const int EAST = 6;
const int SOUTH = 7;
const int WEST = 8;

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
    Serial.begin(9600);
    Serial.setTimeout(10);
    pinMode(NORTH, INPUT);
    pinMode(EAST, INPUT);
    pinMode(SOUTH, INPUT);
    pinMode(WEST, INPUT);
}

void loop()
{

    readNORTH();
    readSOUTH();
    readEAST();
    readWEST();

    Serial.print(NORTHState);
    Serial.print(',');
    Serial.print(EASTState);
    Serial.print(',');
    Serial.print(SOUTHState);
    Serial.print(',');
    Serial.print(WESTState);
    Serial.println();
    delay(10);
}

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