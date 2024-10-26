import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Link, Stack } from 'expo-router';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear the auth token
      await AsyncStorage.removeItem('authToken');
      // Redirect to the login screen
      router.replace('/(auth)/login');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Sign Out Button */}
      <Pressable onPress={handleSignOut}>
        <Text style={styles.signOut}>Sign Out</Text>
      </Pressable>
      <Stack />
      {/* Log In Button */}
      <Link href="/(auth)/login">
        <Text style>Login Screen</Text>
      </Link>
      {/* Register Button */}
      <Link href="/(auth)/register">
        <Text style>Register Screen</Text>
      </Link>

    </View>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  signOut: {
    fontSize: 18,
  },
});
