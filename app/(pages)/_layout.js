import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../../components/TabBar'

const _layout = () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            name="home/index"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="calendar/index"
            options={{
                title: "Calendar"
            }}
        />
        <Tabs.Screen
            name="tasks/index"
            options={{
                title: "Tasks"
            }}
        />
        <Tabs.Screen
            name="action/index"
            options={{
                title: "Action"
            }}
        />
        <Tabs.Screen
            name="profile/index"
            options={{
                title: "Profile"
            }}
        />
    </Tabs>
  )
}

export default _layout