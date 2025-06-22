import { useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { useTheme } from "../themes/ThemeContext";
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { ImageBackground, TextInput } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import { loginWithFirebase } from '../services/api';


const LoginScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  //const { userName, saveUserName, clearUser } = useUser();
  const styles = createStyles(theme);
  const { login } = useAuth();
  const [email, setEmail] = useState("janne@kommunhuset.se");
  const [password, setPassword] = useState("janne57");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Fyll i e-post och lösenord");
      return;
    }
    try {
      // const result = await loginWithApi(email, password);
      const result = await loginWithFirebase(email, password);

      if (!result || !result.access_token) {
        setError("Du har skrivit in fel användarnamn eller lösenord");
        return;
      }
      await login(result.access_token);
      // navigation.navigate("HomeScreen")
      navigation.navigate("User");
      setSuccess(true);
      // setError("Något gick fel vid inloggningen");
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
            <View style={styles.wrapper}>
            <Text style={styles.label} accessibilityLabel='header'>Inlogg Admin</Text>
            <TextInput
              testID='email-input'
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
              testID='password-input'
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError("");
              }}
              style={styles.input}
              placeholder='Skriv in ditt lösenord'
              placeholderTextColor={theme.placeholderText}
              accessibilityLabel='Lösenord'
              accessibilityHint='Fält där du kan skriva in ditt lösenord'
              secureTextEntry
              keyboardType='default'
              returnKeyType='done'
            />
            {error ? <Text>{error}</Text> : null}

            <AnimatedButton
              testID='login-button'
              onPress={handleSubmit}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
              title="Logga in"
              accessibilityRole='button'
              accessibilityLabel='Logga in knapp'
              accessibilityHint='Tryck här för att logga in med deangivna uppgifterna'
            />
            {success && (
              <Text>Inloggningen lyckades</Text>
            )}
            </View>
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
      justifyContent: "center",
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
    wrapper: {
      backgroundColor: theme.backgroundOpacity,
      padding: 40,
      borderWidth: 1,
      borderColor: theme.card,
      borderRadius: 8,
      width: "100%",
      maxWidth: 400,
      justifyContent: 'center',
      alignItems: "center",
      marginBottom: 30,
      marginTop: 40,
    },
   label: {
      color: theme.textSecondary,
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.textSecondary,
      borderRadius: 8,
      padding: 8,
      width: "100%",
      marginBottom: 10,
      backgroundColor: theme.inputBackground,
    },
    button: {
      backgroundColor: theme.accent,
      padding: 10,
      borderRadius: 6,
      marginTop: 10,
    },
    buttonText: {
      color: theme.card, // t.ex. '#ffffff' om du vill ha vit text
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
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