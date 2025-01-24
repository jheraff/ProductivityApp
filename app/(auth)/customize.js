import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useRouter } from 'expo-router';

const DISPLAY_SIZE = 350;
const THUMBNAIL_SIZE = 70;

const AvatarCustomization = () => {
    const [selectedHair, setSelectedHair] = useState(null);
    const [selectedAccessory, setSelectedAccessory] = useState(null);
    const [userId, setUserId] = useState(null);
    const router = useRouter();
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
                // Check if user already completed personal setup
                checkUserProgress(user.uid);
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, []);

    const checkUserProgress = async (uid) => {
        try {
            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Load existing customization if any
                if (userData.customization) {
                    setSelectedHair(hairStyles.findIndex(h => h.id === userData.customization.hairStyle));
                    setSelectedAccessory(accessories.findIndex(a => a.id === userData.customization.accessory));
                }
            }
        } catch (error) {
            console.error('Error checking user progress:', error);
        }
    };

    
    // Hair styles data
    const hairStyles = [
        { 
            id: 'hair1', 
            source: require('../../assets/sprites/hair1.png'), 
            scale: 0.5,
            position: {
                top: -60,
                left: 40,
            }
        },
        { 
            id: 'hair2', 
            source: require('../../assets/sprites/spritesheet16.png'),
            scale: 0.5,
            position: {
                top: -175,
                left: 0,
            }
        },
        { 
            id: 'hair3', 
            source: require('../../assets/sprites/spritesheet16.png'),
            scale: 1.0,
            position: {
                top: -175,
                left: 0,
            }
        },
        { 
            id: 'hair4', 
            source: require('../../assets/sprites/spritesheet16.png'),
            scale: 1.0,
            position: {
                top: -175,
                left: 0,
            }
        },
    ];

    // Accessories data
    const accessories = [
        { 
            id: 'acc1', 
            source: require('../../assets/sprites/acc1.png'),
            scale: 0.2,
            position: {
                top: -40,
                left: 45,
            }
        },
        { 
            id: 'acc2', 
            source: require('../../assets/sprites/spritesheet16.png'),
            scale: 1.0,
            position: {
                top: DISPLAY_SIZE * -0.3,
                left: 0,
            }
        },
        { 
            id: 'acc3', 
            source: require('../../assets/sprites/spritesheet16.png'),
            scale: 1.0,
            position: {
                top: DISPLAY_SIZE * -0.3,
                left: 0,
            }
        },
        { 
            id: 'acc4', 
            source: require('../../assets/sprites/spritesheet16.png'),
            scale: 1.0,
            position: {
                top: DISPLAY_SIZE * -0.3,
                left: 0,
            }
        },
    ];

    // Handle selection/deselection
    const handleHairSelect = (index) => {
        setSelectedHair(selectedHair === index ? null : index);
    };

    const handleAccessorySelect = (index) => {
        setSelectedAccessory(selectedAccessory === index ? null : index);
    };

    // Handle save
    const handleSave = async () => {
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            const userDocRef = doc(db, "users", userId);
            
            const customization = {
                hairStyle: selectedHair !== null ? hairStyles[selectedHair].id : null,
                accessory: selectedAccessory !== null ? accessories[selectedAccessory].id : null,
            };

            await updateDoc(userDocRef, {
                customizationComplete: true,
                customization: customization,
            });

            // After successful save, proceed to personal setup
            router.push("/personal");
        } catch (error) {
            console.error('Error saving customization:', error);
        }
    };

    // Selection item component
    const SelectionItem = ({ source, selected, onSelect }) => (
        <Pressable
            style={[
                styles.selectionItem,
                selected && styles.selectedItem
            ]}
            onPress={onSelect}
        >
            <View style={styles.spriteContainer}>
                <Image
                    source={source}
                    style={styles.itemImage}
                />
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Avatar Customization</Text>
            <Text style={styles.subHeader}></Text>

            {/* Main avatar display */}
            <View style={styles.avatarContainer}>
                {/* Base avatar */}
                <Image
                    source={require('../../assets/sprites/base_avatar64.png')}
                    style={styles.baseAvatar}
                />
                
                {/* Selected hair */}
                {selectedHair !== null && (
                    <View style={[
                        styles.overlayContainer,
                        { 
                            transform: [{ scale: hairStyles[selectedHair].scale }],
                            top: hairStyles[selectedHair].position.top,
                            left: hairStyles[selectedHair].position.left,
                        }
                    ]}>
                        <Image
                            source={hairStyles[selectedHair].source}
                            style={styles.overlayImage}
                        />
                    </View>
                )}

                {/* Selected accessory */}
                {selectedAccessory !== null && (
                    <View style={[
                        styles.overlayContainer,
                        {
                            transform: [{ scale: accessories[selectedAccessory].scale }],
                            top: accessories[selectedAccessory].position.top,
                            left: accessories[selectedAccessory].position.left,
                        }
                    ]}>
                        <Image
                            source={accessories[selectedAccessory].source}
                            style={styles.overlayImage}
                        />
                    </View>
                )}
            </View>

            {/* Customization options */}
            <View style={styles.customizationPanel}>
                {/* Hair selection */}
                <View style={styles.selectionSection}>
                    <Text style={styles.sectionTitle}>Hair Styles</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.optionsRow}>
                            {hairStyles.map((hair, index) => (
                                <SelectionItem
                                    key={hair.id}
                                    source={hair.source}
                                    selected={selectedHair === index}
                                    onSelect={() => handleHairSelect(index)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Accessory selection */}
                <View style={styles.selectionSection}>
                    <Text style={styles.sectionTitle}>Face Accessories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.optionsRow}>
                            {accessories.map((acc, index) => (
                                <SelectionItem
                                    key={acc.id}
                                    source={acc.source}
                                    selected={selectedAccessory === index}
                                    onSelect={() => handleAccessorySelect(index)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Save Button */}
                <Pressable 
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
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
    avatarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    baseAvatar: {
        width: DISPLAY_SIZE,
        height: DISPLAY_SIZE,
        resizeMode: 'contain',
    },
    overlayContainer: {
        position: 'absolute',
        width: DISPLAY_SIZE,
        height: DISPLAY_SIZE,
        overflow: 'hidden',
    },
    overlayImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    customizationPanel: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    selectionSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    selectionItem: {
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ddd',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    selectedItem: {
        borderColor: '#007AFF',
    },
    spriteContainer: {
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AvatarCustomization;