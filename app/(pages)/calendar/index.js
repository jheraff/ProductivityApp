import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,SafeAreaView} from 'react-native';
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

    }); // Calendar date
  }; 
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <Calendar
        style={{ width: 320}}
        current={currentDate}
        markedDates={{
          '2024-12-15': { selected: true, selectedColor: '#109c37' },
          '2024-12-04': { selected: true, selectedColor: '#109c37' },
          '2024-12-25': { selected: true, selectedColor: 'yellow' },
          '2024-12-25': { selected: true, selectedColor: 'yellow' },
          '2024-12-23': { selected: true, selectedColor: 'yellow' },
          '2024-12-10': { selected: true, selectedColor: '#109c37' },

          '2025-01-02': { selected: true, selectedColor: 'yellow' },
          '2025-01-29': { selected: true, selectedColor: 'yellow' },
          '2025-01-24': { selected: true, selectedColor: 'yellow' },
          '2025-01-11': { selected: true, selectedColor: 'yellow' },
          '2025-01-13': { selected: true, selectedColor: 'yellow' },
          '2025-01-06': { selected: true, selectedColor: 'yellow' },


          '2025-02-03': { selected: true, selectedColor: 'yellow' },
          '2025-02-24': { selected: true, selectedColor: 'yellow' },
          '2025-02-20': { selected: true, selectedColor: 'yellow' },
          '2025-02-14': { selected: true, selectedColor: 'yellow' },
          '2025-02-09': { selected: true, selectedColor: 'yellow' },
          '2025-02-02': { selected: true, selectedColor: 'yellow' },


          '2025-03-04': { selected: true, selectedColor: 'yellow' },
          '2025-03-22': { selected: true, selectedColor: 'yellow' },
          '2025-03-16': { selected: true, selectedColor: 'yellow' },
          '2025-03-13': { selected: true, selectedColor: 'yellow' },
          '2025-03-07': { selected: true, selectedColor: 'yellow' },
          '2025-03-03': { selected: true, selectedColor: 'yellow' },
          '2025-03-26': { selected: true, selectedColor: 'yellow' },
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262B2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
});
