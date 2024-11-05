import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MongoClient } from 'mongodb';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Open up app/index.js to start working on your app!</Text>
      <Text>Test test test</Text>
      <Text>Live Laugh Valorant (Added By Kyle Deocampo)</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

