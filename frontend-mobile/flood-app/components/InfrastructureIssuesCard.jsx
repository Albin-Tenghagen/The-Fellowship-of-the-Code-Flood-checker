import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mockSafetyData } from '../services/api'

const InfrastructureIssuesCard = ({
  title = 'Infrastrukturproblem',
  width = '90%',
  maxItems = null,
  titleColor = null,
  backgroundColor = null,
  errorColor = null,
  emptyTextColor = null,
}) => {
  const { theme } = useTheme();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
        
        // TODO: Replace with your actual API call
        // const data = await fetchInfrastructureIssues();
        
        // Mock data for now - replace with your actual API call
        // Testa att göra en random-funktion så att dessa värden ändras "for show"
useEffect(() => {
  const getInfrastructureIssues = async () => {
    try {
      setLoading(true);
      setError(null);

      setTimeout(() => {
        try {
          const shuffled = [...mockSafetyData.locations].sort(() => 0.5 - Math.random());
          const randomItems = shuffled.slice(0, Math.floor(Math.random() * 3) + 1);

          const randomizedIssues = randomItems.map((item, index) => ({
            id: item.id || index,
            type: getRandomType(),
            description: interpolateDescription(item.description),
            severity: getRandomSeverity(),
          }));

          setIssues(randomizedIssues);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching infrastructure issues:', error);
          setError(error.message);
          setLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Unexpected error in getInfrastructureIssues:', error);
      setError(error.message);
      setLoading(false);
    }
  }; // <-- DU GLÖMDE DENNA!

  getInfrastructureIssues();
}, []);


  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#d32f2f';
      case 'medium':
        return '#f57c00';
      case 'low':
        return '#388e3c';
      default:
        return theme.textSecondary;
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'alert-circle';
      case 'medium':
        return 'alert';
      case 'low':
        return 'information';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: backgroundColor || theme.card, width }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="alert-box-outline"
          size={24}
          color={theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
          {title}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color={theme.primary} style={styles.loader} />
      ) : error ? (
        <Text style={[styles.errorText, { color: errorColor || 'red' }]}>Fel: {error}</Text>
      ) : issues.length === 0 ? (
        <View style={styles.noIssuesContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={32}
            color={theme.success || '#4caf50'}
            style={{ marginBottom: 8 }}
          />
          <Text style={[styles.emptyText, { color: emptyTextColor || theme.textSecondary }]}>
            Inga infrastrukturproblem rapporterade
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.issuesContainer}>
          {(maxItems ? issues.slice(0, maxItems) : issues).map((issue) => (
            <View key={issue.id} style={[styles.issueItem, { borderLeftColor: getSeverityColor(issue.severity) }]}>
              <View style={styles.issueHeader}>
                <MaterialCommunityIcons
                  name={getSeverityIcon(issue.severity)}
                  size={20}
                  color={getSeverityColor(issue.severity)}
                  style={{ marginRight: 8 }}
                />
                <Text style={[styles.issueType, { color: theme.textPrimary }]}>
                  {issue.type}
                </Text>
              </View>
              <Text style={[styles.issueDescription, { color: theme.textSecondary }]}>
                {issue.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default InfrastructureIssuesCard;


const getRandomSeverity = () => {
  const severities = ['high', 'medium', 'low'];
  return severities[Math.floor(Math.random() * severities.length)];
};

const getRandomType = () => {
  const types = ['Sensor', 'Nätverk', 'Batteri', 'System', 'Brandlarm'];
  return types[Math.floor(Math.random() * types.length)];
};

const interpolateDescription = (desc) => {
  const waterlevel = (Math.random() * 50 + 10).toFixed(1) + ' cm';
  return desc.replace('${waterlevel}', waterlevel);
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    marginVertical: 12,
    textAlign: 'center',
  },
  noIssuesContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  issuesContainer: {
    maxHeight: 300,
  },
  issueItem: {
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 4,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  issueType: {
    fontSize: 16,
    fontWeight: '600',
  },
  issueDescription: {
    fontSize: 14,
    marginLeft: 28,
  },
});