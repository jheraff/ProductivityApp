import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const TabBar = ({ state, descriptors, navigation }) => {
    const icons = {
        'home/index': (props) => (
            <Image
                source={require('../assets/icons/HomeIcon.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'calendar/index': (props) => (
            <Image
                source={require('../assets/icons/CalendarIcon.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'tasks/index': (props) => (
            <Image
                source={require('../assets/icons/TaskIcon.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'action/index': (props) => (
            <Image
                source={require('../assets/icons/ActionIcon.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
        'profile/index': (props) => (
            <Image
                source={require('../assets/icons/ProfileIcon.png')}
                style={{ width: props.width, height: props.height }}
            />
        ),
    };

    const primaryColor = 'black';
    const secondaryColor = 'white';

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                // Check if the route is an auth route
                if ([
                    '_sitemap', 
                    '+not-found', 
                    '(auth)/login', 
                    '(auth)/register', 
                    '(pages)/home/index',
                    '(pages)/tasks/index',
                    '(pages)/calendar/index',
                    '(pages)/action/index',
                    '(pages)/settings/index'
                
                ].includes(route.name)) return null;

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

                const Icon = icons[route.name]; // Get the icon function

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
                        {/* Check if Icon exists before calling it */}
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
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
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
