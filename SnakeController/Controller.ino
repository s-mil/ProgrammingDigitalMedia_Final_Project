// The arduino code for controlling the snake game

//Assigning pins to buttons

const int NORTH = 5;
const int EAST = 6;
const int SOUTH = 7;
const int WEST = 8;

unsigned long debounceDelay = 50;

//NORTH setup
int lastNORTHState = 0;
unsigned long lastNORTHDebounceTime = 0; 

//EAST setup
int lastEASTState = 0;
unsigned long lastEASTDebounceTime = 0; 

//SOUTH setup
int lastSOUTHState = 0;
unsigned long lastSOUTHDebounceTime = 0; 

//WEST setup
int lastWESTState = 0;
unsigned long lastWESTDebounceTime = 0; 


void setup(){
    Serial.begin(9600);
    Serial.setTimeout(10);
    pinMode(NORTH, INPUT);
    pinMode(EAST, INPUT);
    pinMode(SOUTH, INPUT);
    pinMode(WEST, INPUT);
}

void loop(){

}

void readButton()
{
    int reading = digitalRead(colorPin);

    if (reading != lastButtonState)
    {
        lastDebounceTime = millis();
    }
    if ((millis() - lastDebounceTime) > debounceDelay)
    {
        if (reading != buttonState)
        {
            buttonState = reading;
            if (buttonState == HIGH)
            {
                colorSelected++;
                if (colorSelected > 9)
                {
                    colorSelected = 0;
                }
            }
        }
    }
    lastButtonState = reading;
}



void readButton()
{
    int reading = digitalRead(colorPin);

    if (reading != lastButtonState)
    {
        lastDebounceTime = millis();
    }
    if ((millis() - lastDebounceTime) > debounceDelay)
    {
        if (reading != buttonState)
        {
            buttonState = reading;
            if (buttonState == HIGH)
            {
                colorSelected++;
                if (colorSelected > 9)
                {
                    colorSelected = 0;
                }
            }
        }
    }
    lastButtonState = reading;
}


void readButton()
{
    int reading = digitalRead(colorPin);

    if (reading != lastButtonState)
    {
        lastDebounceTime = millis();
    }
    if ((millis() - lastDebounceTime) > debounceDelay)
    {
        if (reading != buttonState)
        {
            buttonState = reading;
            if (buttonState == HIGH)
            {
                colorSelected++;
                if (colorSelected > 9)
                {
                    colorSelected = 0;
                }
            }
        }
    }
    lastButtonState = reading;
}


void readButton()
{
    int reading = digitalRead(colorPin);

    if (reading != lastButtonState)
    {
        lastDebounceTime = millis();
    }
    if ((millis() - lastDebounceTime) > debounceDelay)
    {
        if (reading != buttonState)
        {
            buttonState = reading;
            if (buttonState == HIGH)
            {
                colorSelected++;
                if (colorSelected > 9)
                {
                    colorSelected = 0;
                }
            }
        }
    }
    lastButtonState = reading;
}