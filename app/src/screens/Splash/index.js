import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => { 
      navigation.navigate('Home');
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.image} 
        />
      </View>
    </View>
  );
};

export default Splash;