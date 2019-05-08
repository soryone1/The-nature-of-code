#include <ArduinoBLE.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif

BLEService ReceiverService("5725fe87-a47a-4992-8b55-416347f9e9ca"); // BLE LED Service

BLEByteCharacteristic pixel_Height_Characteristic("19b10014-e8f2-537e-4f6c-d104768a1214", BLERead | BLEWrite);

int val = 0;
int preVal;

//neopixel
#define neoPixelPin    6
#define NUMPIXELS      11
float Green = 0;
float increase = 0.1;
int pixelNum;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, neoPixelPin, NEO_GRB + NEO_KHZ800);

int currentState = 0; //0 none, 1 recognized, 2 data inaccurate

void setup() {
  strip.begin();    // initialize pixel strip
  strip.clear();    // turn all LEDs off

  Serial.begin(9600);

  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("poseToHeight");
  BLE.setAdvertisedService(ReceiverService);

  // add the characteristic to the service
  ReceiverService.addCharacteristic(pixel_Height_Characteristic);

  // add service
  BLE.addService(ReceiverService);

  // set the initial value for the characeristic:
  pixel_Height_Characteristic.writeValue(0);

  // start advertising
  BLE.advertise();

  //  Serial.println("DMX Peripheral");
}

void loop() {


  BLEDevice central = BLE.central();
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    while (central.connected()) {

      if (pixel_Height_Characteristic.written()) {
        if (pixel_Height_Characteristic.value()) {
          val = pixel_Height_Characteristic.value();
          if (val == 99) {
            Breath();
          } else {

            if (val != preVal) {
              pixelNum = val;
              strip.clear();
              strip.setPixelColor(pixelNum - 1, strip.Color(100, 150, 0));
              strip.show();

            }
            preVal = val;
          }
        }
      }
    }
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
  }
}


void Breath() {
  strip.clear();
  for (int i = 0; i < NUMPIXELS; i++) {
    strip.setPixelColor(i, strip.Color(0, 150, 0));
    }
    strip.show();
  }
