import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useRouter } from 'expo-router';

const TaskPreferences = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const taskTypes = [
        { id: 'Fitness', color: '#F46036' },
        { id: 'Career', color: '#5B85AA' },
        { id: 'Health', color: '#4E668D' },
        { id: 'Creativity', color: '#414770' },
        { id: 'Chores', color: '#372248' },
        { id: 'Mind', color: '#171123' }
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await loadUserPreferences(currentUser.uid);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    const loadUserPreferences = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.taskPreferences) {
                    setSelectedTypes(userData.taskPreferences);
                }
                
                // Check if customization is complete
                if (!userData.customizationComplete) {
                    router.push('/customize');
                }
            }
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    };

    const toggleTaskType = (typeId) => {
        setSelectedTypes(prev => {
            if (prev.includes(typeId)) {
                return prev.filter(id => id !== typeId);
            } else {
                return [...prev, typeId];
            }
        });
    };

    const savePreferences = async () => {
        if (!user) {
            console.error('No user found');
            return;
        }

        if (selectedTypes.length === 0) {
            alert('Please select at least one task type');
            return;
        }

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                personalSetupComplete: true,
                taskPreferences: selectedTypes
            }, { merge: true });

            router.push("/home");
        } catch (error) {
            console.error('Error saving preferences:', error);
            alert('Failed to save preferences. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Personalize Your Type of Tasks</Text>
            <Text style={styles.subHeader}>Please choose the types of tasks you want to work on</Text>

            <View style={styles.typesContainer}>
                {taskTypes.map(type => (
                    <Pressable
                        key={type.id}
                        style={[
                            styles.typeButton,
                            { backgroundColor: type.color },
                            selectedTypes.includes(type.id) && styles.selectedType
                        ]}
                        onPress={() => toggleTaskType(type.id)}
                    >
                        <Text style={styles.typeText}>{type.id}</Text>
                    </Pressable>
                ))}
            </View>

            <Pressable
                style={styles.saveButton}
                onPress={savePreferences}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
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
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    typeButton: {
        width: '48%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        opacity: 0.7,
        alignItems: 'center',
    },
    selectedType: {
        opacity: 1,
        transform: [{ scale: 1.02 }],
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    typeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TaskPreferences;