import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Loader = ({ animationType, modalVisible, dimensions, text }) => {
  const left = width/2 - (dimensions + 20)/2;
  const top = height/2 - (dimensions + 20)/2;

  return (
    <Modal animationType={animationType} transparent visible={modalVisible}>
      <View style={styles.wrapper}>
        <View style={[styles.loaderContainer, {width: dimensions, height: dimensions, left: left, top: top}]}>
          <ActivityIndicator size='large' style={{marginTop: 15}} />
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
  loaderContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
  },
  text: {
    fontSize: 14, 
    fontWeight: '500', 
    color: '#FFFFFF', 
    textAlign: 'center', 
    paddingHorizontal: 10, 
    marginVertical: 10
  }
});

export default Loader;