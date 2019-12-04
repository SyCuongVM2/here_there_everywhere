import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../../assets/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 45, 
    backgroundColor: '#E5E5E5', 
    elevation: 3, 
    paddingHorizontal: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: '#999999'
  },
});

export default styles;