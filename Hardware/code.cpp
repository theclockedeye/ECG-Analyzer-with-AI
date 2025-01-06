// Pin definition for AD8232
const int ecgPin = A0; // Analog pin connected to the AD8232 OUT pin

void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Set up the ECG pin
  pinMode(ecgPin, INPUT);

  // Notify that the setup is complete
  Serial.println("ECG Analyzer initialized. Starting data transmission...");
}

void loop() {
  // Read the analog value from the AD8232 sensor
  int ecgValue = analogRead(ecgPin);

  // Send the ECG value to the system via Serial
  Serial.println(ecgValue);

  // Add a small delay to control the sampling rate
  delay(2); // Adjust based on your system requirements (500Hz sampling rate = ~2ms delay)
}
