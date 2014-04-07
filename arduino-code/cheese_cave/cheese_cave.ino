#include <SHT1x.h>

#define dataPin (12)
#define clockPin (13)
#define relayPin (8)

SHT1x sht1x(dataPin, clockPin);

void setup() {
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT); 
}

float temp;
float humidity;
int last_state = LOW;
int inp;

void humidifier_on() {
  digitalWrite(relayPin, HIGH);
}

void humidifier_off() {
  digitalWrite(relayPin, LOW);
}

void loop() {

  temp = sht1x.readTemperatureC();
  humidity = sht1x.readHumidity();
  
  if(humidity < 80.0) {
     humidifier_on();
  }
  
  if(humidity > 85.0) {
     humidifier_off();    
  }

  if(Serial.available() > 0) {
    inp = Serial.read();
    Serial.print("<");  
    Serial.print(humidity);
    Serial.print("|");
    Serial.print(temp);
    Serial.print(">");  
    Serial.print("\r");
    Serial.print("\n");
    Serial.flush();
  }
  delay(1000);
}
