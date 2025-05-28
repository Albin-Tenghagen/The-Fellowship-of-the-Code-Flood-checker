import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from "../themes/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WaterLevelCard from '../components/WaterLevelCard';
import InfoCard from '../components/InfoCard';
import InfrastructureIssuesCard from '../components/InfrastructureIssuesCard';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import TipsDisplayCard from '../components/TipsDisplayCard';
import { useTips } from '../context/TipsContext';

// import TipsBoxCard from '../components/TipsBoxCard';
// import { fetchTips } from '../services/api';
// import { useUser } from '../context/UserContext';
// import { useAuth } from '../context/AuthContext';
// import { saveToStorage, getFromStorage, deleteFromStorage } from '../services/webCompatibleSecureStore';
const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const alertData = route.params?.alert;
  const { refreshTrigger } = useTips();


  const navigateToTipsScreen = () => {
    navigation.navigate('Tips');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <HeroImage /> */}
        <View style={styles.infoCardContainer}>
          <InfoCard
            title="Information till allmänheten"
            width="90%"
            icon="information-variant"
            titleColor={theme.textTertiary}
            valueColor={theme.textPrimary}
            timestampColor={theme.textPrimary}
            alertData={alertData}
            text="Vid akut översvämningsrisk – ring 112. För övrig information, använd vår app."
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
            Infrastrukturproblem
          </Text>

          <InfrastructureIssuesCard
            title="Aktuella problem"
            maxItems={3}
          />
        </View>

        <View>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
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

          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
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
        </View>

        <TipsDisplayCard
          title="Varningar från allmänheten"
          width="90%"
          maxItems={5}
          refresh={refreshTrigger}
          textColor={theme.textPrimary}
          iconColor={theme.primary}
        />
        <View>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Tipsa om problem
          </Text>
          {/* <View style={styles.instructionContent}>
            <MaterialIcons name="info-outline" size={20} color={theme.primary} />
            <Text style={[styles.instructionText, { color: theme.primary }]}>
              Här kan du tipsa allmänheten om problem i din omgivning - till exempel höga vattenflöden.
            </Text>
          </View> */}

          <TouchableOpacity
            style={[styles.navigationCard, { backgroundColor: theme.card }]}
            onPress={navigateToTipsScreen}
          >
            <View style={styles.navigationCardContent}>
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={32}
                color={theme.primary}
                style={styles.navigationIcon}
              />
              <View style={styles.navigationTextContainer}>
                <Text style={[styles.navigationTitle, { color: theme.textPrimary }]}>
                  Skicka tips ifall du ser en risk för översvämning
                </Text>
                <Text style={[styles.navigationSubtitle, { color: theme.textPrimary }]}>
                  Här kan du tipsa allmänheten och kommunen om till exempel översvämningar
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
 
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navigationCard: {
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navigationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationIcon: {
    marginRight: 16,
  },
  navigationTextContainer: {
    flex: 1,
  },
  navigationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  navigationSubtitle: {
    fontSize: 14,
  },
  instructionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  instructionText: {
    fontSize: 12,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
});
