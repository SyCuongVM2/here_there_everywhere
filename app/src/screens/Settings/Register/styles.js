import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../../assets/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: 'gray'
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: 'white'
  }
});

export default styles;