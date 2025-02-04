import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const TabBar = ({ state, descriptors, navigation }) => {
    const icons = {
        'home/index': (props) => (
            <Image
                source={require('../assets/icons/home.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'calendar/index': (props) => (
            <Image
                source={require('../assets/icons/calendar.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'tasks/index': (props) => (
            <Image
                source={require('../assets/icons/quest.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'action/index': (props) => (
            <Image
                source={require('../assets/icons/action.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'profile/index': (props) => (
            <Image
                source={require('../assets/icons/settings.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
    };

    const primaryColor = 'black';
    const secondaryColor = 'white';

    // List of allowed tabs
    const allowedTabs = [
        'home/index',
        'calendar/index',
        'tasks/index',
        'action/index',
        'profile/index'
    ];

    return (
        <View style={styles.tabbar}>
            {state.routes
                .filter(route => allowedTabs.includes(route.name)) // Only show allowed routes
                .map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const Icon = icons[route.name];

                    return (
                        <TouchableOpacity
                            key={route.name}
                            style={styles.tabbarItem}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            {Icon ? Icon({
                                color: isFocused ? primaryColor : secondaryColor,
                                width: 24,
                                height: 24,
                            }) : null}
                            <Text style={{
                                color: isFocused ? primaryColor : secondaryColor,
                                fontSize: 11
                            }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
        backgroundColor: 'red',
        paddingVertical: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    }
});

export default TabBar;
