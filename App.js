import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Welcome from './screens/WelcomeSCreen';
import Add from './screens/Add';
import Home from './screens/HomeScreen';
import Settings from './screens/settings';
import Your from './screens/yoursellingintrests';
import YourAdded from './screens/addedItem';
import Detail from './screens/Detail';
import Notification from './screens/Notification';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
export default class App extends React.Component {
  render() {
    return <AppContaienr />;
  }
}
var bottom = createBottomTabNavigator({
  AddItem: {
    screen: Add,
  },
  HomeScreen: {
    screen: Home,
  },
});
var drawer = createDrawerNavigator({
  HomeScreen: {
    screen: bottom,
    navigationOptions: {
      drawerIcon: <FontAwesome5 name="home" size={24} color="black" />,
    },
  },
  Notifications: {
    screen: Notification,
    navigationOptions: {
      drawerIcon: <AntDesign name="notification" size={24} color="black" />,
    },
  },
  AddedItems: {
    screen: YourAdded,
    navigationOptions: {
      drawerIcon: <AntDesign name="edit" size={24} color="black" />,
    },
  },
  YourSellingIntrest: {
    screen: Your,
    navigationOptions: {
      drawerIcon: (
        <Image
          source={{
            uri:
              'https://icon-library.com/images/interested-icon/interested-icon-25.jpg',
          }}
          style={{width:25,height:25}}
        />
      ),
    },
  },
});
var stack = createStackNavigator({
Re:{screen:Detail,navigationOptions:{headerShown:false}},
Home:{screen:Home,navigationOptions:{headerShown:false}},

})

var swicth = createSwitchNavigator({
  Welcome: { screen: Welcome },
  Drawer:{screen:drawer},
  Detail:{screen:stack},
});
var AppContaienr = createAppContainer(swicth);
