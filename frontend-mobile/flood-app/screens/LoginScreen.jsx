import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Platform, ScrollView } from 'react-native';
import { useTheme } from "../themes/ThemeContext";
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../context/UserContext';
import { saveToStorage, getFromStorage, deleteFromStorage } from '../services/webCompatibleSecureStore';
import { useAuth } from '../context/AuthContext';
import { ImageBackground, TextInput } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';


const LoginScreen = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { userName, saveUserName, clearUser } = useUser();
  const styles = createStyles(theme);
  const { login, logout } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = () => {
    if (name.trim().length < 2) {
        setError("Namnet måste vara minst 2 tecken");
        return;
    }
    saveUserName(name.trim());
    const fakeToken = Math.random().toString(36).slice(2);
    login(fakeToken);
    navigation?.navigate("Home");
  };

  const handleSaveToken = async () => {
    const fakeToken = Math.random().toString(36).slice(2);
    await saveToStorage("userToken", fakeToken);
    console.log("Token sparad!");
  };

  const handleGetToken = async () => {
    const token = await getFromStorage("userToken");
    console.log("Token hämtad:", token);

  };

  const handleDeleteToken = async () => {
    await deleteFromStorage("userToken");
    console.log("Token är raderad");
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
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.scrollContainer}
              accessibilityRole={true}
              accessibilityLabel='Scrollbart innehåll med introduktion till appens aktiviteter'
              >
            <View style={styles.form}>
              <Text style={styles.label}>Admin inlogg
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    setError("");
                }}
                style={styles.input}
                placeholder='Skriv in ditt användarnamn'
                placeholderTextColor={theme.textTertiary}
                accessibilityLabel='Användarnamn'
                accessibilityHint='Fält där du skriver in ditt användarnamn'
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                 <AnimatedButton title="Logga in" onPress={() => console.log('Sparar')}accessibilityRole='button'
                accessibilityLabel='Knapp för att logga in' />

                
            </View>
            <View style={styles.section}>
              <Text>
                {userName ? `Välkommen ${userName}!` : `Välkommen - ingen användare!`}
              </Text>
              <Pressable
                onPress={() => {
                  logout();
                  clearUser();
                }}
                >
                  <Text>Logga ut</Text>
                </Pressable>
            </View>
            <View >
              <Pressable onPress={handleSaveToken}>
                <Text>Spara token</Text>
              </Pressable>
              <Pressable onPress={handleGetToken}>
               <Text>Hämta token</Text>
              </Pressable>
              <Pressable onPress={handleDeleteToken}>
               <Text>Ta bort token</Text>
              </Pressable>
            </View>
        </ScrollView>
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
