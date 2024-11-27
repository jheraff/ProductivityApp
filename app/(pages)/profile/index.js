import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { auth } from '../../../config/firebase'; // Import Firebase auth instance
import { signOut } from 'firebase/auth'; // Import signOut function from Firebase
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const Profile = () => {
    const router = useRouter(); // Initialize router

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            router.push('/login'); // Navigate to the login page
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };

    return (
        <View>
            
            <Pressable onPress={handleLogout}>
                <Text> Sign Out </Text>
            </Pressable>    

        </View>
    );
};



export default Profile;
