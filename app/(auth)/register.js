import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'expo-router';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    FlatList, 
    StyleSheet, 
    SafeAreaView, 
    KeyboardAvoidingView,
    Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    const register = async () => {
        try {
            // Validate inputs first
            if (!email || !password || !username) {
                alert("Please fill in all fields");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create new user document with initial state
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: user.email,
                xp: 0,
                level: 1,
                stats: {
                    strength: 1,
                    intellect: 1,
                    agility: 1,
                    arcane: 1,
                    focus: 1,
                },
                inventory: [],
                tasks: [],
                currency: 0,
                customizationComplete: false,
                personalSetupComplete: false,
                createdAt: new Date(),
            });

            // Start the new user flow
            router.push('/customize');
        } catch (err) {
            console.error("Error registering user:", err);
            // Handle specific registration errors
            if (err.code === 'auth/email-already-in-use') {
                alert("This email is already registered. Please login instead.");
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Check if user document already exists
            const userDoc = await getDoc(doc(db, "users", user.uid));
            
            if (!userDoc.exists()) {
                // Create new user document for Google sign-up
                await setDoc(doc(db, "users", user.uid), {
                    username: user.displayName || "Anonymous",
                    email: user.email,
                    xp: 0,
                    level: 1,
                    stats: {
                        strength: 1,
                        intellect: 1,
                        agility: 1,
                        arcane: 1,
                        focus: 1,
                    },
                    inventory: [],
                    tasks: [],
                    currency: 0,
                    customizationComplete: false,
                    personalSetupComplete: false,
                    createdAt: new Date(),
                });
                
                // Start the new user flow
                router.push('/customize');
            } else {
                // Existing Google user - go to home
                router.push('/home');
            }
        } catch (err) {
            console.error("Error with Google sign-up:", err);
            alert("Google sign-up failed. Please try again.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <KeyboardAvoidingView>

                {/* Main Container for form and title */}
                <View style={styles.boxContainer}>

                    {/* Application Title */}
                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                        <Text style={styles.appTitle}>Productivity App</Text>
                    </View>

                    {/* Register Title */}
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
                            Register to your account
                        </Text>
                    </View>

                    <View style={{ marginTop: 40 }}>

                        {/* Username Input Field */}
                        <View style={styles.inputContainer}>
                            <Ionicons style={styles.iconStyle} name="person" size={24} color="gray" />
                            <TextInput
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                style={styles.textInput}
                                placeholder="Enter your name"
                            />
                        </View>

                        {/* Email Input Field */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons style={styles.iconStyle} name="email" size={24} color="gray" />
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.textInput}
                                placeholder="Enter your email"
                            />
                        </View>

                        {/* Password Input Field */}
                        <View style={styles.inputContainer}>
                            <AntDesign style={styles.iconStyle} name="lock1" size={24} color="gray" />
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={styles.textInput}
                                placeholder="Enter your password"
                            />
                        </View>

                        {/* Register Button */}
                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                            <Pressable
                                onPress={register}
                                style={styles.registerButton}
                            >
                                <Text style={styles.registerButtonText}>
                                    Register
                                </Text>
                            </Pressable>
                        </View>

                        {/* Social Media Registration Buttons */}
                        <View style={styles.socialContainer}>
                            <Pressable 
                                onPress={signInWithGoogle}
                                style={styles.circleButton}
                            >
                                <AntDesign name="google" size={24} color="black" />
                            </Pressable>

                            <Pressable style={styles.circleButton}>
                                <Entypo name="facebook-with-circle" size={24} color="black" />
                            </Pressable>

                            <Pressable style={styles.circleButton}>
                                <FontAwesome6 name="x-twitter" size={24} color="black" />
                            </Pressable>
                        </View>

                        {/* Link to Login Screen */}
                        <Pressable
                            onPress={() => router.replace("(auth)/login")}
                            style={{ marginTop: 15 }}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
                                Already have an account? Sign In
                            </Text>
                        </Pressable>

                    </View>

                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default Register;

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        width: 350,
        elevation: 5,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        marginTop: 40,
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#F67B7B",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#E0E0E0",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20,
    },
    iconStyle: {
        marginLeft: 8,
    },
    textInput: {
        color: "gray",
        marginVertical: 10,
        width: 300,
        fontSize: 17,
    },
    registerButton: {
        width: 200,
        backgroundColor: "#F67B7B",
        padding: 15,
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: 'center',
    },
    registerButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: '100%',
    },
    circleButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
});