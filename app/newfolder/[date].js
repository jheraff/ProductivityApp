import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function DateScreen() {
  const router = useRouter();
  const { date } = router.query;

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Selected Date: {date}</Text>
      {/* You can use the 'date' to fetch or display specific data */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 24,
    color: '#fff',
  },
});
