import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Avatar, Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      userid: firebase.auth().currentUser.email,
      image: '',
      item: '',
      minimumbidvalue: '',
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  send = () => {
    db.collection('add').add({
      user: this.state.userid,
      item: this.state.item,
      minimumbidvalue: this.state.minimumbidvalue,
      image:this.state.image,
      status:'unread',
      date:firebase.firestore.FieldValue.serverTimestamp(),
      id:this.createUniqueId()
    });
    this.setState({ image: '' });
  };
  render() {
    console.log(this.state.image);
    var ima = this.state.image.toString;
    console.log('image' + ima);
    return (
      <View>
        <Header centerComponent={{ text: 'Add Item' }} />
        <KeyboardAvoidingView style={{ marginTop: 40 }}>
          <TextInput
            placeholder={'item name'}
            onChangeText={(text) => this.setState({ item: text })}
            style={{
              alignSelf: 'center',
              width: 400,
              
              height: 30,
              borderBottomWidth: 2,
            }}
          />
          <TextInput
            placeholder={'minimum  value (rupees)'}
            onChangeText={(text) => this.setState({ minimumbidvalue: text })}
            style={{
              alignSelf: 'center',
              width: 400,
              height: 30,
              borderBottomWidth: 2,
              marginTop:30
            }}
          />
          <TextInput
            placeholder={'image uri'}
            onChangeText={(text) => this.setState({ image: text })}
            style={{
              alignSelf: 'center',
              width: 400,
              height: 30,
              borderBottomWidth: 2,
              marginTop:30
            }}
          />

          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Image
              source={{ uri: this.state.image }}
              style={{ width: 100, height: 100, borderWidth: 2 }}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HomeScreen');
                Alert.alert('item Added');
                this.send();
              }}
              style={{
                backgroundColor: 'green',
                width: 150,
                alignItems: 'center',
              }}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
