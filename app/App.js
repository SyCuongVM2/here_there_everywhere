import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigation from './src/navigation/AppNavigation';
import store from './src/redux/store';
import { loadUser } from './src/redux/actions/authActions';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={{flex: 1}}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;