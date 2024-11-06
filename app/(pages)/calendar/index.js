import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DateBox from './DateBox';

const Calendar = () => {


  const days = Array.from({length: 30}, (_,i) => i+1);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


  return (
    <View style={styles.container}>

      <View style={styles.calendarBox}> 
      <DateBox day={1} />
      </View>

      <View style={styles.monthBox}>
      <Text style={{ color: 'black', marginTop: 5 }}>{months[0]} </Text>
      </View>


      <View style={styles.leftButton}>
      <Text style={{ color: 'black', marginTop: 5 }}> right</Text>
      </View>

      <View style={styles.rightButton}>
      <Text style={{ color: 'black', marginTop: 5 }}> left</Text>
      </View>

      <StatusBar style="auto" />
      
    </View>

    
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBox: {
    width: 330,
    height: 316,
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 4,
    backgroundColor: '#4CA5E4',
    alignItems: 'center',
    flexDirection: 'row',      // Adjust layout direction
    flexWrap: 'wrap',          // Allow items to wrap onto the next line
    justifyContent: 'flex-start', // Align items to the start
    padding: 10,

  },
 

  monthBox: {
    width: 100,
    height: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FEEEEE',
    alignItems: 'center',

    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 0 },
    //shadowOpacity: 1,
    //shadowRadius: 10,
    
    position: 'relative',
    bottom: 390,
  },

  leftButton: {
    width: 40,
    height: 30,

    backgroundColor: '#808080',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 2,

    position: 'relative',
    bottom: 410,
    left: 100,


  },

  rightButton: {
    width: 40,
    height: 30,

    backgroundColor: '#808080',
    position: 'relative',
    bottom: 440,
    right: 100,

    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 2,

  },

});