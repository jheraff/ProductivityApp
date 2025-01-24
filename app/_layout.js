import { Stack, Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack />

      <View style={styles.navBar}>
        <Link href="/" style={styles.navItem}>
          <Text style={styles.navText}>app/index.js</Text>
        </Link>
        <Link href="/home" style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </Link>
        <Link href="/calendar" style={styles.navItem}>
          <Text style={styles.navText}>Calendar</Text>
        </Link>
        <Link href="/tasks" style={styles.navItem}>
          <Text style={styles.navText}>Tasks</Text>
        </Link>
        <Link href="/action" style={styles.navItem}>
          <Text style={styles.navText}>Actions</Text>
        </Link>
        <Link href="/settings" style={styles.navItem}>
          <Text style={styles.navText}>Settings</Text>
        </Link>
        <Link href="/user" style={styles.navItem}>
          <Text style={styles.navText}>User</Text>
        </Link>
        <Link href="/action/adventure" style={styles.navItem}>
          <Text style={styles.navText}>Adventure</Text>
        </Link>
        <Link href="/action/items" style={styles.navItem}>
          <Text style={styles.navText}>Items</Text>
        </Link>
        <Link href="/action/shop" style={styles.navItem}>
          <Text style={styles.navText}>Shop</Text>
        </Link>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  navText: {
    fontSize: 10,
    color: '#000000',
  },
});
