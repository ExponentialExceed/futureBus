// #define BLYNK_PRINT Serial // Enables Serial Monitor
#include <ServerExceed.h>
#include <SPI.h>
#include <BlynkSimpleEsp8266.h>
#define BLYNK_PRINT Serial


// Setting for Server
WiFiServer server(80); // nodeMCU server : port 80
char ssid[] = "eXceed 2G";
char password[] = "";
char host[] = "10.32.176.4";
int port = 80;
String group = "Exponential";
ServerExceed mcu(ssid, password, host, port, group, &server);

// Setting for Blynk
char auth[] = "69425dda95ec400c8bea69c3b4fe202f";
char blynk_host[] = "10.32.176.4";
int blynk_port = 18442;

void setup() {
  Serial.begin(115200);
  mcu.connectServer();
  Blynk.config(auth, blynk_host, blynk_port);
  
  Serial.print("\n\nIP: ");
  Serial.println(WiFi.localIP());
}

String data = "";
String blynk_data = "";
String server_data = "";
void loop() {
  if(Serial.available()) {
  	data = Serial.readStringUntil('\r');
  	Serial.flush();
  	// YOUR CODE HERE
  	
  	mcu.sendDataFromBoardToServer(data);
  }
  mcu.sendDataFromServerToBoard();
  Blynk.run();
}

BLYNK_WRITE(V1)
{
  int pinValue = param.asInt(); // assigning incoming value from pin V1 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  Serial.print("V1 Slider value is: ");
  Serial.println(pinValue);
}
