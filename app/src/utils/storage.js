import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};

export {
  storeData,
  getData,
  removeData
};