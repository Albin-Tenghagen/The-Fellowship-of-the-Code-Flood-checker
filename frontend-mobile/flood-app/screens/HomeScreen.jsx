import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from "../themes/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WaterLevelCard from '../components/WaterLevelCard';
import InfoCard from '../components/InfoCard';
import InfrastructureIssuesCard from '../components/InfrastructureIssuesCard';

const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const navigateToTipsScreen = () => {
    navigation.navigate('Tips');
  };

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

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Infrastrukturproblem
        </Text>

        <InfrastructureIssuesCard
          title="Aktuella problem"
          width="90%"
          maxItems={3}
          
        />

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Säkerhetstips
        </Text>

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
                Se alla tips eller dela med dig av dina egna
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.primary}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.infoCardContainer}>
          <InfoCard
            title="Information till allmänheten"
            text="Vid akut översvämningsrisk – ring 112. För övrig information, använd vår app."
            width="90%"
            height={50}
            icon="information-variant"
            titleColor={theme.primary}
            valueColor={theme.textPrimary}
            timestampColor={theme.textPrimary}
          />
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  infoCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
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
});
