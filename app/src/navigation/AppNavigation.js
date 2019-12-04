import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Splash from '../screens/Splash';

import Category from '../screens/Home/Category';
import Comments from '../screens/Home/Comments';
import Reply from '../screens/Home/Reply';
import Detail from '../screens/Home/Detail';
import Home from '../screens/Home/Home';
import Search from '../screens/Home/Search';

import Login from '../screens/Settings/Login';
import Register from '../screens//Settings/Register';
import Saved from '../screens//Settings/Saved';
import Settings from '../screens/Settings/Settings';

const MODAL_ROUTES = [
  "Saved",
  "Reply"
];
let dynamicModalTransition = (
  transitionProps,
  prevTransitionProps
) => {
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    MODAL_ROUTES.some(
      screenName => screenName === transitionProps.scene.route.routeName ||
                   (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    )
  );
};

const HomeStack = createStackNavigator(
  { Home, Category, Comments, Detail, Search, Reply },
  { initialRouteName: "Home", headerMode: 'none', transitionConfig: dynamicModalTransition }
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
};

const SettingsStack = createStackNavigator(
  { Settings, Login, Register, Saved },
  { initialRouteName: "Settings", headerMode: 'none' }
);
SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
};

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'SETTINGS',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-settings" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#9d234c',
      inactiveTintColor: '#808FA4',
      showLabel: true,
      style: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

export default createAppContainer(createSwitchNavigator(
  { Splash, bottomTabNavigator },
  { initialRouteName: 'Splash' }
));