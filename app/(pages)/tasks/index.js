import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../../config/firebase';
import { collection, getDocs, setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [taskTimers, setTaskTimers] = useState({});
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user ? user : null);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchOrAssignTasks = async () => {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef);
                    if (!userDoc.exists()) return;

                    const userTasksRef = collection(db, 'users', user.uid, 'userTasks');
                    const userTasksSnapshot = await getDocs(userTasksRef);
                    let userTasks = userTasksSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    // Filter out completed or failed tasks from the fetched tasks
                    userTasks = userTasks.filter(task => task.status !== 'completed' && task.status !== 'failed');

                    if (userTasks.length === 0) {
                        await assignNewTask();
                    } else {
                        setTasks(userTasks);
                        startTaskTimers(userTasks); // Start timers for active tasks
                    }

                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching or assigning tasks:', error);
                    setError('Error fetching tasks');
                    setLoading(false);
                }
            };

            fetchOrAssignTasks();
        }
    }, [user]);

    const pickRandomTasks = (tasksArray, numberOfTasks) => {
        const shuffled = [...tasksArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfTasks);
    };

    const assignNewTask = async () => {
        const tasksRef = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksRef);
        const allTasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const randomTask = pickRandomTasks(allTasks, 1)[0];

        const userTask = { ...randomTask, status: 'new', durationRemaining: randomTask.duration };
        await setDoc(doc(db, 'users', user.uid, 'userTasks', randomTask.id), userTask);

        setTasks(prevTasks => [...prevTasks, userTask]);
    };

    const startTask = async (taskId) => {
        if (user) {
            const taskRef = doc(db, 'users', user.uid, 'userTasks', taskId);
            await setDoc(taskRef, { status: 'inProgress' }, { merge: true });

            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, status: 'inProgress' } : task
            ));
        }
    };

    const completeTask = async (taskId, xpReward) => {
        if (user) {
            const taskRef = doc(db, 'users', user.uid, 'userTasks', taskId);
            await setDoc(taskRef, { status: 'completed' }, { merge: true });

            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const { xp = 0 } = userDoc.data();
                await setDoc(userRef, { xp: xp + xpReward }, { merge: true });
            }

            // Remove completed task from state immediately
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

            await assignNewTask(); // Assign a new task once completed
        }
    };

    const failTask = async (taskId) => {
        if (user) {
            const taskRef = doc(db, 'users', user.uid, 'userTasks', taskId);
            await updateDoc(taskRef, { status: 'failed' });

            // Keep the task in the state, just mark it as failed
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: 'failed' } : task
                )
            );
        }
    };

    const handleFetchNewTask = async (taskId) => {
        // Remove the failed task when the user clicks on "Fetch New Task"
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

        // Assign a new task after removing the failed one
        await assignNewTask();
    };

    const handleCompleteTask = async (taskId, xpReward) => {
        await completeTask(taskId, xpReward);
    };

    const startTaskTimers = (userTasks) => {
        const timers = {};

        userTasks.forEach((task) => {
            if (task.durationRemaining > 0 && task.status === 'inProgress') {
                timers[task.id] = setInterval(() => {
                    setTasks((prevTasks) =>
                        prevTasks.map((t) => {
                            if (t.id === task.id) {
                                if (t.durationRemaining <= 1) {
                                    clearInterval(timers[task.id]);
                                    failTask(task.id); // Mark task as failed when time runs out
                                    return { ...t, durationRemaining: 0, status: 'failed' };
                                }
                                return { ...t, durationRemaining: t.durationRemaining - 1 };
                            }
                            return t;
                        })
                    );
                }, 1000); // 1 second interval
            }
        });

        setTaskTimers(timers);
    };

    if (loading) {
        return <Text>Loading tasks...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Tasks</Text>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <View key={task.id} style={styles.taskContainer}>
                        <Text style={styles.taskTitle}>{task.taskName}</Text>
                        <Text style={styles.taskDescription}>Type: {task.taskType}</Text>
                        <Text style={styles.taskDescription}>Difficulty: {task.difficulty}</Text>
                        <Text style={styles.taskDescription}>XP Reward: {task.xpReward}</Text>
                        <Text style={styles.taskDescription}>Duration: {task.durationRemaining} minutes</Text>
                        <Text style={styles.taskDescription}>Status: {task.status}</Text>

                        {/* Show the start task button if status is 'new' */}
                        {task.status === 'new' ? (
                            <Pressable
                                style={styles.button}
                                onPress={() => startTask(task.id)}
                            >
                                <Text style={styles.buttonText}>Start Task</Text>
                            </Pressable>
                        ) : task.status === 'inProgress' ? (
                            <Text>Time Remaining: {task.durationRemaining} minutes</Text>
                        ) : task.status === 'failed' ? (
                            <>
                                {/* If the task failed, show the button to fetch a new task */}
                                <Pressable
                                    style={styles.button}
                                    onPress={() => handleFetchNewTask(task.id)}
                                >
                                    <Text style={styles.buttonText}>Fetch New Task</Text>
                                </Pressable>
                            </>
                        ) : null}

                        {/* Add a button to complete the task and reward XP */}
                        {task.status === 'inProgress' && (
                            <Pressable
                                style={styles.button}
                                onPress={() => handleCompleteTask(task.id, task.xpReward)}
                            >
                                <Text style={styles.buttonText}>Complete Task</Text>
                            </Pressable>
                        )}
                    </View>
                ))
            ) : (
                <Text>No tasks available</Text>
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
    taskContainer: {
        marginBottom: 20,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Tasks;
