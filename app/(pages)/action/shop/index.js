import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Shop({ navigation }) {
  // User's gold balance (initially set to 5000 for example)
  const [userGold, setUserGold] = useState(5000);

  // Define the items array with placeholder items
  const items = [
    { name: 'Sword', rarity: 'common' },
    { name: 'Shield', rarity: 'uncommon' },
    { name: 'Potion', rarity: 'rare' },
    { name: 'Helmet', rarity: 'epic' },
    { name: 'Boots', rarity: 'legendary' },
    { name: 'Ring', rarity: 'common' },
  ];

  // Map rarity levels to colors
  const rarityColors = {
    common: '#C0C0C0',     // Silver
    uncommon: '#008000',   // Green
    rare: '#0000FF',       // Blue
    epic: '#800080',       // Purple
    legendary: '#FFD700',  // Gold
  };

  // Map rarity levels to base costs
  const rarityBaseCosts = {
    common: 100,
    uncommon: 250,
    rare: 500,
    epic: 1000,
    legendary: 2000,
  };

  // Assign dynamic cost to each item based on rarity
  const shopItems = items.map((item) => {
    const baseCost = rarityBaseCosts[item.rarity];
    const randomVariation = Math.floor(Math.random() * baseCost * 0.2); // Up to 20% variation
    const cost = baseCost + randomVariation;
    return {
      ...item,
      cost,
    };
  });

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;

  // Calculate item size based on the number of columns
  const numColumns = 3;
  const itemSpacing = 15; // Space between items
  const totalSpacing = itemSpacing * (numColumns + 1);
  const itemSize = (screenWidth - totalSpacing) / numColumns;

  // Render each item in the grid
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemBox,
        {
          backgroundColor: rarityColors[item.rarity],
          height: itemSize/4,
          width: itemSize/4,
        },
      ]}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemCost}>{item.cost} Gold</Text>
    </TouchableOpacity>
  );

  // Handle item press
  const handleItemPress = (item) => {
    // Check if user has enough gold
    if (userGold >= item.cost) {
      // Show confirmation dialog
      Alert.alert(
        'Confirm Purchase',
        `Are you sure you want to buy ${item.name} for ${item.cost} Gold?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Buy',
            onPress: () => purchaseItem(item),
          },
        ],
        { cancelable: false }
      );
    } else {
      // Show insufficient funds message
      Alert.alert(
        'Insufficient Funds',
        `You do not have enough gold to buy ${item.name}.`,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  // Purchase item
  const purchaseItem = (item) => {
    // Deduct item cost from user's gold
    setUserGold(userGold - item.cost);
    // Add item to user's inventory (implement this as needed)
    // For example:
    // addToInventory(item);
    Alert.alert(
      'Purchase Successful',
      `You have purchased ${item.name}!`,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Half - Shopkeeper Image */}
      <View style={styles.imageContainer}>
         {/* Placeholder Text */}
         <Text style={styles.placeholderText}>ShopKeeper Image Here</Text>
        {/* <Image
          source={require('../../assets/shopkeeper.png')} // Update the path to your image
          style={styles.shopkeeperImage}
        /> */}
      </View>

      {/* Bottom Half - Items Grid */}
      <View style={styles.itemsContainer}>
        {/* User's Gold Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Gold: {userGold}</Text>
        </View>
        <FlatList
          data={shopItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          scrollEnabled={false} // Disable scrolling since we have a fixed grid
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Top half with shopkeeper image
  imageContainer: {
    height: '40%', // Top half of the screen
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // shopkeeperImage: {
  //   width: '80%',
  //   height: '80%',
  //   resizeMode: 'contain',
  // },
  // Bottom half with items grid
  itemsContainer: {
    height: '60%', // Bottom half of the screen
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    margin: 7.5, // Half of itemSpacing to get full spacing between items
    borderRadius: 5,
  },
  itemText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 14,
  },
  itemCost: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
});