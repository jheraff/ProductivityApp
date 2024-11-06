import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const DateBox = ({day}) => {
    return (
        <View style = {styles.dateBox}>
            

            <View style={styles.dateText}>
              <Text style={{ color: 'black', marginTop: 5 }}> {day} </Text>
            </View>

        </View>
      );
}


export default DateBox;

const styles = StyleSheet.create({

    dateBox: {
        width: 30,
        height: 30,
        backgroundColor: '#89D5FF',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, 
      },

    dateText: {
        color: '#fff',
        font: 10,
    },

});




