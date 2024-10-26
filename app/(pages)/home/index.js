import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import axios from 'axios'; // for making HTTP requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // for local storage

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Function to fetch user data from the server
        const fetchUserData = async () => {
            try {
                // Get the authentication token from AsyncStorage
                const token = await AsyncStorage.getItem("authToken");
                
                
                if (!token) {
                    console.log("No token found");
                    return; 
                }

                // GET request to fetch user data
                const response = await axios.get("http://localhost:3000/auth/user", {
                    headers: { Authorization: token }, 
                });

                
                setUserData(response.data);
            } catch (error) {
                console.log("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []); 

    if (!userData) {
        return <Text style={styles.loadingText}>Loading...</Text>; 
    }

    // user data
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Username: {userData.username}</Text>
            <Text style={styles.info}>Level: {userData.level}</Text>
            <Text style={styles.info}>Currency: {userData.currency}</Text>
            <Text style={styles.info}><strong>Stats:</strong></Text>
            <Text style={styles.info}>Strength: {userData.stats.strength}</Text>
            <Text style={styles.info}>Intellect: {userData.stats.intellect}</Text>
            <Text style={styles.info}>Agility: {userData.stats.agility}</Text>
            <Text style={styles.info}>Arcane: {userData.stats.arcane}</Text>
            <Text style={styles.info}>Focus: {userData.stats.focus}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20, 
        backgroundColor: "#fff", 
        alignItems: 'center', 
    },
    title: {
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: "#000", 
    },
    info: {
        fontSize: 18, 
        marginBottom: 10, 
        color: "#000", 
    },
    loadingText: {
        fontSize: 18,
        color: "#000", 
    },
});

export default Home; 
