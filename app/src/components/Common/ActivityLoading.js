import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const ActivityLoading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color='#9d234c' />
    </View>
  )
};
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ActivityLoading;