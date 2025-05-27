import { Platform } from "react-native";

let baseUrl = "";

if (Platform.OS === "android") {
    baseUrl = "http://10.0.2.2:5001"
} else if (Platform.OS === "ios") {
    baseUrl = "http://localhost:5001";
} else if (Platform.OS === "web") {
    baseUrl = "http://localhost:5001";
} else {
    // Byt ut till datorns IP-adress
    baseUrl = "http://192.168.0.232";
}

export default baseUrl;
