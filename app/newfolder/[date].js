import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const DateScreen = () => {
  const router = useRouter();


  const {date} = useLocalSearchParams();

  if (!date) {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Selected Date: {date}</Text>
      <Pressable onPress={() => router.replace("/calendar")}>
        <Text> Go back </Text>
      </Pressable>
    </View>

  
  );
};

export default DateScreen;

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
