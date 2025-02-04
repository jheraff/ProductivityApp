import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Action = () => {
    const router = useRouter();
    const primaryColor = 'black';
    const secondaryColor = 'white';

    const routes = [
        { name: 'Adventure', route: '/action/adventure' }, 
        { name: 'Items', route: '/action/items' },
        { name: 'Shop', route: '/action/shop' }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Action</Text>

            {routes.map((item) => {
                const onPress = () => {
                    router.push(item.route);
                };

                return (
                    <TouchableOpacity
                        key={item.route}
                        style={[
                            styles.button,
                            { backgroundColor: router.pathname === item.route ? primaryColor : secondaryColor }
                        ]}
                        accessibilityRole="button"
                        accessibilityState={router.pathname === item.route ? { selected: true } : {}}
                        onPress={onPress}
                    >
                        <Text style={{ color: router.pathname === item.route ? secondaryColor : primaryColor, fontSize: 18 }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: 'black',
  },
});

export default Action;