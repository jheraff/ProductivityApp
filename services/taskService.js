// src/services/taskService.js
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';

// Add a task
export const addTask = async (userId, taskData) => {
  try {
    await addDoc(collection(db, 'tasks'), {
      ...taskData,
      userId,
      createdAt: Timestamp.now(),
    });
  } catch (err) {
    console.error('Error adding task: ', err);
  }
};

// Get tasks for a user
export const getUserTasks = async (userId) => {
  try {
    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => tasks.push({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (err) {
    console.error('Error fetching tasks: ', err);
  }
};

// Update task status
export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { status: newStatus });
  } catch (err) {
    console.error('Error updating task status: ', err);
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
  } catch (err) {
    console.error('Error deleting task: ', err);
  }
};
