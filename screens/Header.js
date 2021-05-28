import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
export default class Head extends React.Component {
  render() {
    return (
      <Header
        leftComponent={
          <FontAwesome
            name="bars"
            size={24}
            color="black"
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
          />
        }
        centerComponent={{ text: this.props.t, style: { color: 'red' } }}
        rightComponent={
          <Ionicons
            name="notifications"
            size={24}
            color="black"
            onPress={() => {
              this.props.navigation.navigate('Notifications');
            }}
            containerStyle={{
              backgroundColor:'#1d9953'
            }}
          />
        }
      />
    );
  }
}
