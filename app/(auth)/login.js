import { auth, googleProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc, limit, updateDoc } from 'firebase/firestore';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            
            if (userDoc.exists()) {
                // For existing users, direct to home regardless of setup status
                router.push('/home');
            } else {
                // Handle edge case where user exists in Auth but not in Firestore
                console.error("User document not found in Firestore");
                router.push('/login');
            }
        } catch (err) {
            console.error('Error logging in with email and password:', err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userDoc = await getDoc(doc(db, "users", result.user.uid));
            
            if (userDoc.exists()) {
                // Existing Google user - go to home
                router.push('/home');
            } else {
                // New Google user - start registration flow
                router.push('/register');
            }
        } catch (err) {
            console.error('Error logging in with Google:', err);
        }
    };

    const checkUserDoc = async (user) => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            const userData = userDoc.data();

            if (!userData.customizationComplete) {
                router.push("/customize");
            } else if (!userData.personalSetupComplete) {
                router.push("/personal");
            } else {
                router.push("/home");
            }
        } else {
            await setDoc(userDocRef, {
                username: user.displayName || "Anonymous",
                email: user.email,
                xp: 0,
                level: 1,
                stats: { strength: 1, intellect: 1, agility: 1, arcane: 1, focus: 1 },
                inventory: [],
                tasks: [],
                currency: 0,
                customizationComplete: false,
                personalSetupComplete: false,
                createdAt: new Date()
            });
            router.push("/customize");

        }
    };

    const loadOrFetchTasks = async (userId) => {
        if (!userId) return;

        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        const userTasks = userDoc.data()?.tasks || [];

        if (userTasks.length > 0) {
            setTasks(userTasks);
        } else {
            await fetchAndSaveRandomTasks(userId);
        }
    };

    const fetchAndSaveRandomTasks = async (userId) => {
        try {
            const tasksRef = collection(db, 'tasks');
            const querySnapshot = await getDocs(tasksRef);

            const allTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const randomTasks = pickRandomTasks(allTasks, 3);

            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, { tasks: randomTasks });

            setTasks(randomTasks);
        } catch (err) {
            console.error('Error fetching random tasks:', err);
        }
    };

    const pickRandomTasks = (tasks, n) => {
        let result = [];
        let len = tasks.length;
        let taken = new Array(len);
        if (n > len) throw new RangeError("pickRandomTasks: more tasks requested than available");
        while (n--) {
            let x = Math.floor(Math.random() * len);
            result.push(tasks[x in taken ? taken[x] : x]);
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };

    const handleCompleteTask = async (taskId) => {
        const userDocRef = doc(db, "users", userId);
        const taskDocRef = doc(db, "tasks", taskId);

        try {
            // Remove completed task from user tasks in Firestore
            await updateDoc(userDocRef, { tasks: arrayRemove({ id: taskId }) });

            // Fetch a new random task and add it
            const tasksRef = collection(db, 'tasks');
            const querySnapshot = await getDocs(tasksRef);
            const allTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const newTask = pickRandomTasks(allTasks, 1)[0];

            await updateDoc(userDocRef, { tasks: arrayUnion(newTask) });

            // Update local state with the new task
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId).concat(newTask));
        } catch (err) {
            console.error('Error completing task:', err);
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
                                secureTextEntry={true}
                            />
                        </View>

                        {/* Forgot Password link */}
                        <View style={{ alignItems: "center", marginTop: 12 }}>
                            <Text> Forgot Password </Text>
                        </View>

                        {/* Login button */}
                        <View style={{ marginTop: 30 }} />
                        <Pressable
                            onPress={login}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>
                                Login
                            </Text>
                        </Pressable>

                        {/* Social Media Login Buttons */}
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
    );
};

export default Login;

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
        elevation: 5,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
});