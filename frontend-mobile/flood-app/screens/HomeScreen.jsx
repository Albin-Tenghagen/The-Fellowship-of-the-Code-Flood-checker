import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { useEffect } from 'react';
import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import WaterLevelCard from '../components/WaterLevelCard';
import InfoCard from '../components/InfoCard';
import TipsBoxCard from '../components/TipsBoxCard';
import { fetchTips } from '../services/api';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { saveToStorage, getFromStorage, deleteFromStorage } from '../services/webCompatibleSecureStore';
const HomeScreen = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const getTips = async () => {
      setTipsLoading(true);
      try {
        const tipsData = await fetchTips();
        setTips(tipsData);
        setTipsError(null);
      } catch (error) {
        setTipsError(error.message);
      } finally {
        setTipsLoading(false);
      }
    };

    getTips();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <HeroImage /> */}

       
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Nuvarande vattenövervakning
        </Text>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Vattennivå"
            parameter="ultraSoundLevel"
            width="45%"
            icon="water"
          />
          <WaterLevelCard
            title="Trycknivå"
            parameter="pressureLevel"
            width="45%"
            icon="gauge"
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Väderförhållanden
        </Text>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Temperatur"
            parameter="temperature"
            width="45%"
            icon="thermometer"
          />
          <WaterLevelCard
            title="Luftfuktighet"
            parameter="humidity"
            width="45%"
            icon="water-percent"
          />
        </View>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Lufttryck"
            parameter="airPressure"
            width="45%"
            icon="weather-windy"
          />
          <WaterLevelCard
            title="Jordfuktighet"
            parameter="soilMoisture"
            width="45%"
            icon="water-percent"
          />
        </View>

        <View style={styles.cardContainer}>
          <TipsBoxCard
            title="Säkerhetstips"
            text="Vid översvämning, håll dig borta från vattnet och följ myndigheternas råd."
            width="90%"
            height={150}
            icon="message-arrow-right-outline"
          />
        </View>

         <View style={styles.cardContainer}>
          <InfoCard
            title="Information till allmänheten"
            text="Vid akut översvämningsrisk – ring 112. För övrig information, använd vår app."
            width="90%"
            height={150}
            icon="information-variant"
          />
        </View>


      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tipsContainer: {
    paddingHorizontal: 20,
  },
  tipCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tipUser: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffeeee',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});