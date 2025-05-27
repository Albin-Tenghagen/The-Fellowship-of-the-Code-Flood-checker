import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Platform, ScrollView } from 'react-native';
import { useTheme } from "../themes/ThemeContext";
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../context/UserContext';
import { saveToStorage, getFromStorage, deleteFromStorage } from '../services/webCompatibleSecureStore';
import { useAuth } from '../context/AuthContext';
import { ImageBackground, TextInput } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import { loginWithApi } from '../services/api';


const LoginScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  //const { userName, saveUserName, clearUser } = useUser();
  const styles = createStyles(theme);
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("pwned123");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || ! password) {
        setError("Fyll i e-post och lösenord");
        return;
    }
    try {
      const result = await loginWithApi(email, password);

      if (!result || !result.access_token) {
        setError("Du har skrivit in fel användarnamn eller lösenord");
        return;
      }
      await login(result.access_token);
      navigation.navigate("HomeScreen")
      setError("Något gick fel vid inloggningen");
    } catch (error) {
      console.error("Login error", error);
      setError("Något gick fel vid inlogggningen")
    }
  };

 

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
      barStyle={isDark ? "Light-content" : "dark-content"}
      backgroundColor={theme.headerBackground}
      />
      <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={Platform.OS === "web" ? styles.webBackground : styles.background}
      resizeMode='cover'
      accessible 
      accessibilityLabel='Bakgrundsbild med inloggningsformulär'
      >
        <View style={styles.overlay}>
            <View
              style={styles.container}
              contentContainerStyle={styles.scrollContainer}
              accessibilityRole={true}
              accessibilityLabel='Scrollbart innehåll med introduktion till appens aktiviteter'
              >
              <Text style={styles.label} accessibilityLabel='header'>Logga in</Text>
              <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError("");
                  }}
                  style={styles.input}
                  placeholder='Skriv in din email-adress'
                  accessibilityLabel='email-adress'
                  accessibilityHint='Fält där du kan skriva in din email'
                  keyboardType='email-address'
                  returnKeyType='done'
                  />
              <TextInput
                value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  style={styles.input}
                  placeholder='Skriv in ditt lösenord'
                  placeholderTextColor={theme. textSecondary}
                  accessibilityLabel='Lösenord'
                  accessibilityHint='Fält där du kan skriva in ditt lösenord'
                  secureTextEntry
                  keyboardType='default'
                  returnKeyType='done'
                />
                {error ? <Text>{error}</Text> : null}

                <AnimatedButton
                onPress={handleSubmit}
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                title="Logga in"
                accessibilityRole='button'
                accessibilityLabel='Logga in knapp'
                accessibilityHint='Tryck här för att logga in med deangivna uppgifterna'
                ><Text>Logga in</Text></AnimatedButton>

            
        </View>
        </View>
      </ImageBackground>
    </SafeAreaView>

   
  );
};

export default LoginScreen;

const createStyles = (theme) =>
StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webBackground: {
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent:"center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },

  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  form: {
    backgroundColor: theme.backgroundOpacity,
    padding: 40,
    borderWidth: 1,
    borderColor: theme.card,
    borderRadius: 8,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    color: theme.textSecondary,
    fontSize: 22,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 8,
    padding: 8,
    width: "100%",
    marginBottom: 10,
    backgroundColor: theme.card,
  },
  button: {
    backgroundColor: theme.accent,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  section: {
    marginTop: 20,
    alignItems: "center",
  },
  errorText: {
    color: theme.textError,
    marginBottom: 10,
    fontSize: 20,
  },
 
})