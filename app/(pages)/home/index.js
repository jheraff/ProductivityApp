import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { db } from '../../../config/firebase';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const { width: screenWidth } = Dimensions.get('window');

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
            {/* Top Section with Stats */}
            <View style={styles.topSection}>
                {/* Left side - Username and Level */}
                <View style={styles.userInfo}>
                    <Text style={styles.header}>{userStats?.username || 'User'}</Text>
                    <Text style={styles.levelText}>Level {userStats?.level ?? 'N/A'}</Text>
                </View>
                
                {/* Right side - XP */}
                <View style={styles.xpContainer}>
                    <Text style={styles.xpText}>XP: {userStats?.xp ?? '0'}</Text>
                </View>
            </View>

            {/* Basic Stats Section */}
            {userStats && (
                <View style={styles.basicStats}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>STR</Text>
                        <Text style={styles.statValue}>{userStats.stats?.strength ?? 'N/A'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>INT</Text>
                        <Text style={styles.statValue}>{userStats.stats?.intellect ?? 'N/A'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>AGI</Text>
                        <Text style={styles.statValue}>{userStats.stats?.agility ?? 'N/A'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>ARC</Text>
                        <Text style={styles.statValue}>{userStats.stats?.arcane ?? 'N/A'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>FOC</Text>
                        <Text style={styles.statValue}>{userStats.stats?.focus ?? 'N/A'}</Text>
                    </View>
                </View>
            )}
            
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatarFrame}>
                    <Image
                        source={{ uri: userStats?.avatarUrl || 'https://via.placeholder.com/150' }}
                        style={styles.avatar}
                    />
                </View>
            </View>

            {/* Inventory Section */}
            <View style={styles.inventoryContainer}>
                <Text style={styles.subHeader}>Inventory</Text>
                <View style={styles.inventoryGrid}>
                    <View style={styles.inventoryBox} />
                    <View style={styles.inventoryBox} />
                    <View style={styles.inventoryBox} />
                    <View style={styles.inventoryBox} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    userInfo: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    levelText: {
        fontSize: 18,
        color: '#666',
    },
    xpContainer: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 8,
    },
    xpText: {
        fontSize: 16,
        fontWeight: '500',
    },
    basicStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarFrame: {
        width: screenWidth * 0.6, // Reduced to 40% of screen width
        height: (screenWidth * 0.6) * 1.25, // Maintaining 4:3 aspect ratio
        borderWidth: 2,
        borderColor: '#ccc',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inventoryContainer: {
        marginTop: 5,
    },
    inventoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    inventoryBox: {
        width: screenWidth * 0.1, // Reduced to 10% of screen width
        aspectRatio: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default HomePage;