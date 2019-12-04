import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../../assets/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  headerContainer: {
    height: 45, 
    backgroundColor: 'white', 
    elevation: 3, 
    paddingHorizontal: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E5'
  },
  headerItem: {
    marginLeft: 25
  },
  categoryContainer: {
    flexDirection: 'row', 
    padding: 10,
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E5'
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 15
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;