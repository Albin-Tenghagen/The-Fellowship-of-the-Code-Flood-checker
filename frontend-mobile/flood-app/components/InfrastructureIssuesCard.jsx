import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { fetchInfrastructureIssues } from '../services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InfrastructureIssuesCard = ({
  title = 'Infrastrukturproblem',
  width = '90%',
  maxItems = 3,
  titleColor = null,
}) => {
  const { theme } = useTheme();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfrastructureIssues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInfrastructureIssues();


        const sortedIssues = data
          .sort((a, b) => {
            try {
              const dateA = new Date(a.timestamp);
              const dateB = new Date(b.timestamp);
              return dateB - dateA;
            } catch (err) {
              return b.timestamp.localeCompare(a.timestamp);
            }
          })
          .slice(0, maxItems);

        setIssues(sortedIssues);
      } catch (err) {
        console.error('Error fetching infrastructure issues:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getInfrastructureIssues();
  }, [maxItems]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';

    return timestamp;
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: backgroundColor || theme.card },
        width ? { width } : {},
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
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
        <Text style={[styles.errorText, { color: errorColor || 'red' }]}>
          Error: {error}
        </Text>
      ) : issues.length === 0 ? (
        <Text style={[styles.emptyText, { color: emptyTextColor || theme.textSecondary }]}>
          Inga aktuella infrastrukturproblem
        </Text>
      ) : (
        <ScrollView style={styles.issuesContainer}>
          {issues.map((issue) => (
            <View key={issue.id} style={styles.issueItem}>
              <Text style={[styles.issueProblem, { color: theme.textPrimary }]}>
                {issue.problem}
              </Text>
              <Text style={[styles.issueTimestamp, { color: theme.textPrimary }]}>
                {formatTimestamp(issue.timestamp)}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default InfrastructureIssuesCard;

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
  emptyText: {
    marginVertical: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  issuesContainer: {
    maxHeight: 200,
  },
  issueItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  issueProblem: {
    fontSize: 16,
    marginBottom: 4,
  },
  issueTimestamp: {
    fontSize: 12,
  },
});