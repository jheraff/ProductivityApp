import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdventureScreen from '../action/adventure';
import ShopScreen from '../action/shop';
import ItemsScreen from '../action/items';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Action">
      <Stack.Screen name="Adventure" component={AdventureScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Items" component={ItemsScreen} />
    </Stack.Navigator>
  );
}
