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
    { id: 1, name: "Study for 2 hours"}, 
    {id: 2, name: "Finish Science Homework"},
    {id: 3, name: "Do 15 pushups"},
  ];

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.dateText}>Tasks for: {date}</Text>
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
        <Text>{name}</Text>
      </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ded8d7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    
  },
  dateText: {
    fontSize: 24,
    color: 'black',
    position: 'absolute',
    top: 25,

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
    top: 60,
  },

  box: {
    width: 750,
    height: 100,
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 4,        // Thickness of the border
    borderColor: 'black',  // Color of the border
    borderRadius: 10,      // Rounded corners
    margin: 10,
  },


});
