#include <Keyboard.h>
#include <ArduinoJson.h>

const String uniqueSecretKey = "#IIC@UEMK_2K24#";

void setup() {
  Serial.begin(9600); // For debugging
  Serial1.begin(9600); // For HC-05
  Keyboard.begin();
}

void loop() {
  if (Serial1.available()) {
    String receivedData =Serial1.readString();

    Serial.println(String(receivedData)); // For debugging
    
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, receivedData);

    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }

    const String secretKey = doc["secretKey"];
    const String username = doc["username"];
    const String password = doc["password"];
    const int mode = doc["mode"];

    if (String(secretKey) == uniqueSecretKey) {
      // Serial.println(String(secretKey) + " " + String(username) + " "  + String(password));
      fillCredentials(username, password, mode);
    }
  }
}

void fillCredentials(const String username, const String password, const int mode) {
  switch(mode)
  {
    case 0 :
      Keyboard.print(username);
      delay(100);
      Keyboard.write(KEY_TAB);
      delay(100);
      Keyboard.print(password);
      delay(100);
      Keyboard.write(KEY_RETURN);

      break;

    case 1 :
        Keyboard.print(username);
        delay(100);
        Keyboard.write(KEY_RETURN);

        break;

    case 2 :
        Keyboard.print(password);
        delay(100);
        Keyboard.write(KEY_RETURN);

        break;

    default :
        Serial.println("Wrong mode!");
  }
 
}

void end() {
  Keyboard.end();
}
