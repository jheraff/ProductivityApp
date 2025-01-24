import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Action({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Button 1 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Adventure')}
      >
        <Text style={styles.buttonText}>Adventure</Text>
      </TouchableOpacity>

      {/* Button 2 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Shop')}
      >
        <Text style={styles.buttonText}>Shop</Text>
      </TouchableOpacity>

      {/* Button 3 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Items')}
      >
        <Text style={styles.buttonText}>Items</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: 200, // Button width
    height: 60,  // Button height
    backgroundColor: '#3F92E5',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10, // Space between buttons
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
