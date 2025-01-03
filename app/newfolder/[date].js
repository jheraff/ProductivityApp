import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable , SafeAreaView, ScrollView} from 'react-native';

const DateScreen = () => {
  const router = useRouter();


  const {date} = useLocalSearchParams();

  if (!date) {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>Loading...</Text>
      </View>
    );
  }

  const taskList = [
    { id: 1, name: "Study for 2 hours", completed: 1}, 
    {id: 2, name: "Finish Science Homework" , completed: 0},
    {id: 3, name: "Do 15 pushups" , completed: 1},
  ];

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.dateText}>Tasks for: {date}</Text>
        <Text style={styles.smallerText}>Today's tasks have been completed!</Text>
          <Pressable style = {styles.backButton} onPress={() => router.replace("/calendar")}>
            <Text styles = {styles.backText}> BACK </Text>
          </Pressable>

        {taskList.map((item) => (
        <TaskComponent key={item.id} name={item.name} />
        ))}

        

        

      </ScrollView>
    </SafeAreaView>
  
  );
};

export default DateScreen;


const TaskComponent = ({ name }) => (
  <View style={styles.tasklayout}>
    <View style={styles.box}>
        <Text style ={styles.taskDescription}>{name}</Text>
        <View style={styles.circle}></View>
        
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#54b8ff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Aligns children to the top
    paddingHorizontal: 20, // Adds padding to the sides
    
  },
  dateText: {
    fontSize: 24,
    color: 'black',
    marginTop: 40,
    marginBottom: 35,

  },

  smallerText: {
    fontSize: 15,
    color: 'black',

  },

  backText: {
    color: 'white',
    fontSize: 16,

  },

  backButton: {
    
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    left: 50,
    top: 30,
    
  },

  tasklayout: {
    width: '90%', // Ensures task layouts span the container width
    marginVertical: 20,
  },

  box: {
    width: '100%', // Makes the box responsive to the container width
    minHeight: 80, // Provides a reasonable minimum height
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center', // Centers text vertically
    position: 'relative',
  },

  taskDescription: {
    fontSize: 20,
    fontWeight: 'bold',
  
  },

  circle: {
    width: 50, // Diameter of the circle
    height: 50, // Same as width for a perfect circle
    backgroundColor: '#109c37', // Circle color
    borderRadius: 25, // Half of the width/height
    position: 'absolute', // Position relative to the box
    right: 15, // Distance from the right edge of the box
    top: '50%', // Vertically centers it
    transform: [{ translateY: -25 }],
    
  },

  

});
