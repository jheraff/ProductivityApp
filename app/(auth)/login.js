import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    KeyboardAvoidingView, 
    TextInput,
    Pressable 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login component for user authentication screen
const Login = () => {
    // State variables for email and password input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();  // Router for navigation between screens

    // Effect to check login status when the component mounts
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");  // Retrieve token from storage
                if (token) {
                    router.replace("/home");  // Redirect to home if token is present
                }
            } catch (error) {
                console.log(error);  // Log any errors in token retrieval
            }
        };
        checkLoginStatus();
    }, []);

    // Handle login process by sending user credentials to the server
    const handleLogin = async () => {
        const user = {
            email: email,
            password: password,
        };
    
        try {
            const response = await axios.post("http://localhost:3000/auth/login", user); // Send login request
    
            if (response.data && response.data.token) {
                const token = response.data.token;
                await AsyncStorage.setItem("authToken", token);  // Store the token locally
    
                router.replace("/home");  // Redirect to home after successful login
            } else {
                console.log("Login failed: Token not provided");
            }
        } catch (error) {
            console.log("Login failed: ", error); 
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <KeyboardAvoidingView>
                <View style={styles.boxContainer}>
                    {/* App title */}
                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                        <Text style={styles.appTitle}>Productivity App</Text>
                    </View>

                    {/* Login prompt */}
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 10 }}>
                            Log in to your account
                        </Text>
                    </View>

                    {/* Input fields */}
                    <View style={{ marginTop: 40 }}>
                        {/* Email input */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons
                                style={{ marginLeft: 8 }}
                                name="email"
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.textInput}
                                placeholder="Enter your email"
                            />
                        </View>

                        {/* Password input */}
                        <View style={styles.inputContainer}>
                            <AntDesign
                                style={{ marginLeft: 8 }}
                                name="lock1"
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={styles.textInput}
                                placeholder="Enter your password"
                                secureTextEntry={true}  // Hides password input
                            />
                        </View>

                        {/* Forgot Password link */}
                        <View style={{ alignItems: "center", marginTop: 12 }}>
                            <Text> Forgot Password </Text>
                        </View>

                        {/* Login button */}
                        <View style={{ marginTop: 30 }} />
                        <Pressable
                            onPress={handleLogin}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>
                                Login
                            </Text>
                        </Pressable>

                        {/* Social Media Login Buttons */}
                        <View style={styles.socialContainer}>
                            <Pressable style={styles.circleButton}>
                                <AntDesign name="google" size={24} color="black" />
                            </Pressable>
                            <Pressable style={styles.circleButton}>
                                <Entypo name="facebook-with-circle" size={24} color="black" />
                            </Pressable>
                            <Pressable style={styles.circleButton}>
                                <FontAwesome6 name="x-twitter" size={24} color="black" />
                            </Pressable>
                        </View>

                        {/* Sign up link */}
                        <Pressable
                            onPress={() => router.replace("(auth)/register")}
                            style={{ marginTop: 15 }}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
                            Don't have an account? Sign up
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login

// Style definitions for component elements
const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        width: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
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
    textInput: {
        color: "gray",
        marginVertical: 10,
        width: 300,
        fontSize: 17,
    },
    loginButton: {
        width: 200,
        backgroundColor: "#F67B7B",
        padding: 15,
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
    },
    loginButtonText: {
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
});
