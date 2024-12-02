import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';



export default function CalendarScreen() {

  const router = useRouter();

  const currentDate = new Date().toISOString().split('T')[0];
  
  const handleDayPress = (day) => {
    const selectedDate = day.dateString; // Format: 'YYYY-MM-DD'

    console.log("Navigating to:", `/newFolder/${selectedDate}`);
    router.push({
      pathname: "/newFolder/[date]",
      params: { date: selectedDate},

    }); //Goes to /newFolder/[date].js
  }; 
  return (
    <View style={styles.container}>
      <Calendar
        style={{ width: 320}}
        current={currentDate}
        markedDates={{
          '2024-12-15': { selected: true, selectedColor: 'green' },
          '2024-12-25': { selected: true, selectedColor: 'yellow' },
          '2024-12-23': { selected: true, selectedColor: 'yellow' },
        }}
        theme={{
          backgroundColor: '#54b8ff',
          calendarBackground: '#54b8ff',
          textSectionTitleColor: '#fff',
          selectedDayBackgroundColor: '#ff6f61',
          selectedDayTextColor: '#00000',
          todayTextColor: '#ff6f61',
          dayTextColor: '#00000',
          arrowColor: '#fff',
          monthTextColor: '#fff',
          textDayFontFamily: 'Arial',
          textMonthFontFamily: 'Arial',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
        }}

        onDayPress={handleDayPress} 
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
