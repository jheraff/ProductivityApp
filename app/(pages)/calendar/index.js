import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Calendar = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.calendarBox}>
      <Text style={{ color: 'white', marginTop: 20 }}>Calendar Content Here</Text>
      </View>

      <View style={styles.dateBox}>
      <Text style={{ color: 'white', marginTop: 5 }}></Text>
      </View>

      <View style={styles.monthBox}>
      <Text style={{ color: 'black', marginTop: 5 }}> Month</Text>
      </View>


      <View style={styles.leftButton}>
      <Text style={{ color: 'black', marginTop: 5 }}> left</Text>
      </View>

      <View style={styles.rightButton}>
      <Text style={{ color: 'black', marginTop: 5 }}> right</Text>
      </View>

      <StatusBar style="auto" />
    </View>

    
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBox: {
    width: 330,
    height: 316,
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: '#4CA5E4',
    alignItems: 'center',

  },
  dateBox: {
    width: 30,
    height: 30,
    backgroundColor: '#89D5FF',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
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

    position: 'relative',
    bottom: 440,
    right: 100,

    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 2,

  },

});