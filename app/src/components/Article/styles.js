import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../assets/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  header: {
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: '600',
    opacity: 0.9,
    textAlign: 'left',
    marginVertical: 10
  },
  desc: {
    fontSize: 14,
    color: '#333',
    fontWeight: '300',
    textAlign: 'left'
  },
  footText: {
    fontSize: 12,
    fontWeight: '200'
  }
});

export default styles;