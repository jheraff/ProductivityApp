import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Action = ({ navigation, state }) => {
    const primaryColor = 'black';
    const secondaryColor = 'white';

    const routes = [
        { name: 'Adventure', route: '/adventure/index' },
        { name: 'Items', route: '/items/index' },
        { name: 'Shop', route: '/shop/index' } 
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Action</Text>

            {routes.map((item, index) => {
                const isFocused = state?.routes[state.index]?.name === item.route;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: item.route,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(item.route);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: item.route,
                    });
                };

                return (
                    <TouchableOpacity
                        key={item.route}
                        style={[styles.button, { backgroundColor: isFocused ? primaryColor : secondaryColor }]}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <Text style={{ color: isFocused ? secondaryColor : primaryColor, fontSize: 18 }}>
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
