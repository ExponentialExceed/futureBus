#include <LiquidCrystal.h>
LiquidCrystal lcd(8, 9, 4, 5, 6, 7);
#define trigPin 12
#define echoPin 11
int passengerIn = 0;
int passengerOut = 0;
int currentPassenger = 0;
int seatAble = 20;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial1.begin(115200);
  lcd.begin(16, 2);
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(A5, INPUT);
}

void loop() {
  int before_passengerIn = passengerIn;
  int before_passengerOut = passengerOut;
  int before_currentPassenger = currentPassenger;
  int front = analogRead(A2);
  int behind = analogRead(A1);
  int temp = (25 * analogRead(A5) - 2050) / 100;
  if ( front < 350) {
    if ( currentPassenger < 20) {
      currentPassenger++;
      passengerIn++;
    }
  }
  if ( behind < 350) {
    if ( currentPassenger > 0) {
      currentPassenger--; passengerOut++;
    }

  }
  seatAble = 20 - currentPassenger;
  lcd.setCursor(0, 0);
  lcd.clear();
  if ( currentPassenger == 20 ) {
    lcd.print("FULL");
  }
  else {
    lcd.print("Available: ");
    lcd.print(seatAble);
  }
  lcd.setCursor(0, 1);
  lcd.print("temp. : ");
  lcd.print(temp);
  lcd.print(" C");

  //Serial1.println("mameaw");
  if (before_passengerIn != passengerIn || before_passengerOut != passengerOut || before_currentPassenger != currentPassenger) {
    String str = "{\"temp\":" + (String)temp + ",\"enter\":" + (String)passengerIn + ",\"leave\":" + (String)passengerOut + "}";
    Serial1.println(str);
    Serial.println(str);
  }
  delay(350);
  SerialEvent();

}
void SerialEvent() {
  if (Serial1.available()) {
    String str = Serial1.readStringUntil('\r');
    //Serial1.flush();
    Serial.println(str);
    str.replace("\r", "");
    str += "666";
    Serial1.println(str);
  }
}

