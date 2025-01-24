import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default function Items() {
  // Define the items array with placeholder items
  const items = [
    { name: 'Sword', rarity: 'common' },
    { name: 'Shield', rarity: 'rare' },
    { name: 'Potion', rarity: 'uncommon' },
    { name: 'Helmet', rarity: 'legendary' },
    { name: 'Boots', rarity: 'epic' },
    { name: 'Ring', rarity: 'rare' },
    { name: 'Amulet', rarity: 'uncommon' },
    { name: 'Armor', rarity: 'common' },
    { name: 'Gloves', rarity: 'common' },
    { name: 'Staff', rarity: 'epic' },
    { name: 'Bow', rarity: 'rare' },
    { name: 'Dagger', rarity: 'uncommon' },
    { name: 'Cloak', rarity: 'legendary' },
    { name: 'Belt', rarity: 'common' },
    { name: 'Bracers', rarity: 'uncommon' },
    { name: 'Helm', rarity: 'epic' },
    { name: 'Tunic', rarity: 'rare' },
    { name: 'Lantern', rarity: 'common' },
    { name: 'Map', rarity: 'uncommon' },
    { name: 'Compass', rarity: 'rare' },
    { name: 'Scroll', rarity: 'epic' },
    { name: 'Book', rarity: 'legendary' },
    { name: 'Necklace', rarity: 'uncommon' },
    { name: 'Charm', rarity: 'common' },
  ];

  // Map rarity levels to colors
  const rarityColors = {
    common: '#C0C0C0',     // Silver
    uncommon: '#008000',   // Green
    rare: '#0000FF',       // Blue
    epic: '#800080',       // Purple
    legendary: '#FFD700',  // Gold
  };

  // Map rarity levels to numerical values for sorting
  const rarityOrder = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
  };

  // Sort items by rarity
  items.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;

  // Calculate item size based on the number of columns
  const numColumns = 4;
  const itemSize = (screenWidth - (numColumns + 1) * 10) / numColumns; // Adjust for margins

  // Render each item in the grid
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemBox,
        {
          backgroundColor: rarityColors[item.rarity],
          height: itemSize/3,
          width: itemSize/3,
        },
      ]}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Handle item press
  const handleItemPress = (item) => {
    // Implement your logic here (e.g., navigate to item details)
    console.log('Item clicked:', item.name);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  list: {
    justifyContent: 'center',
    flexWrap: 'wrap',

  },
  itemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  itemText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});
