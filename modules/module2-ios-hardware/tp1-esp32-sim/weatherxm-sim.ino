#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* openWeatherApiKey = "YOUR_API_KEY";
const char* city = "Paris,FR";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
}

float addGaussianNoise(float val, float stddev) {
  // Simple Box-Muller transform for Gaussian noise
  float u1 = (float)random(1, 10000) / 10000.0;
  float u2 = (float)random(1, 10000) / 10000.0;
  float z0 = sqrt(-2.0 * log(u1)) * cos(2.0 * PI * u2);
  return val + z0 * stddev;
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://api.openweathermap.org/data/2.5/weather?q=" + String(city) + "&appid=" + String(openWeatherApiKey) + "&units=metric";
    
    http.begin(url);
    int httpCode = http.GET();
    
    if (httpCode > 0) {
      String payload = http.getString();
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      
      float baseTemp = doc["main"]["temp"];
      float noisyTemp = addGaussianNoise(baseTemp, 0.2); // Add 0.2C stddev noise
      
      Serial.print("Base Temp: "); Serial.print(baseTemp);
      Serial.print(" | Noisy Temp (Spoofed for WeatherXM): "); Serial.println(noisyTemp);
      
      // Here you would sign and send the packet to the DePIN protocol
    }
    http.end();
  }
  delay(600000); // Wait 10 minutes
}
