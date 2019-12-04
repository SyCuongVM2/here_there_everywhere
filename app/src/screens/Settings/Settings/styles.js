import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../../assets/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 45, 
    backgroundColor: 'white', 
    elevation: 3, 
    padding: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E5'
  }
});

export default styles;