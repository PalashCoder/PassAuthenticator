import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen({ route }: { route: any }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.user.photo }} style={styles.image} />
      <Text style={styles.name}>{user.user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
