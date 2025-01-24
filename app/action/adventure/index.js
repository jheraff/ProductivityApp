import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function Adventure({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {/* Placeholder Text */}
        <Text style={styles.placeholderText}>Adventurer Image Here</Text>
        {/* <Image
        source={require('../assets/character.png')}
        style={styles.characterImage}
        /> */}
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {/* Button 1 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Your action here
          }}
        >
          <Text style={styles.buttonText}>Send on Adventure</Text>
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Your action here
          }}
        >
          <Text style={styles.buttonText}>Items Equipped</Text>
        </TouchableOpacity>

        {/* Button 3 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: windowHeight * 0.45,
    backgroundColor: '#FFFFFF', // Background color for image section
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  separator: {
    height: 0,
    backgroundColor: '#000000', // Line color
  },
  buttonContainer: {
    backgroundColor: '#F0F0F0', // Background color for buttons section
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:0
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
