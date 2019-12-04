import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../assets/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default styles;