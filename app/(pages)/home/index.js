import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from '../../../config/firebase';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetchUserStats(user.uid);
            } else {
                setUserStats(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const fetchUserStats = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                setUserStats(userSnapshot.data());
            }
        } catch (err) {
            console.error('Error fetching user stats:', err);
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Welcome {userStats?.username || 'User'}
            </Text>
            {userStats ? (
                <View style={styles.statsContainer}>
                    <Text>XP: {userStats.xp ?? 'N/A'}</Text>
                    <Text>Level: {userStats.level ?? 'N/A'}</Text>
                    <Text style={styles.subHeader}>Your Stats</Text>
                    <Text>Strength: {userStats.stats?.strength ?? 'N/A'}</Text>
                    <Text>Intellect: {userStats.stats?.intellect ?? 'N/A'}</Text>
                    <Text>Agility: {userStats.stats?.agility ?? 'N/A'}</Text>
                    <Text>Arcane: {userStats.stats?.arcane ?? 'N/A'}</Text>
                    <Text>Focus: {userStats.stats?.focus ?? 'N/A'}</Text>
                </View>
            ) : (
                <Text>No user stats available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statsContainer: {
        marginTop: 20,
    },
});

export default HomePage;
