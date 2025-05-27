## Examples

```cpp
// Be careful not to include SSID or password in git.
fellowshipWiFi::connectWiFi("SSID", "PASSWORD", { 192, 168, 8, 198 }, { 192, 168, 8, 1 }, { 255, 255, 255, 0 });

// Sends data to a server using the GET method (only method currently implemented). 
fellowshipWiFi::sendData(GET, IPAddress{192, 168, 1, 120}, 5000, "/");

String data;
fellowshipWiFi::recieveData(data);

Serial.println(data);
```