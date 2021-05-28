import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      modal: false,
    };
  }
    signin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        var errorm = error.message;
        return Alert.alert(errorm);
      });
  };
  signup = (u, p, c) => {
    if (c === p) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(u, p)
        .then((response) => {
          db.collection('users').add({
            name: this.state.name,
            location: this.state.address,
            emailId: this.state.emailId,
            contact: this.state.contact,
          });
          Alert.alert('signed up');
          this.setState({
            name: '',
            storename: '',
            storeaddres: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            modal: false,
          });
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    } else {
      return Alert.alert('please check your password');
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        visible={this.state.modal}
        transparent={true}>
        <ScrollView>
          <KeyboardAvoidingView>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 1,
                width: 300,
                alignSelf: 'center',
                borderRadius: 20,
                backgroundColor: 'white',
                justifyContent:"space-around",
                marginTop:100
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 25,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontFamily: 'cursive',
                }}>
                Sign up
              </Text>
              <TextInput
                placeholder="name"
                style={{
                  width: 280,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  marginTop: 30,
                }}
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
                value={this.state.name}
              />
              <TextInput
                placeholder="location"
                style={{
                  width: 280,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  marginTop: 30,
                }}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
                value={this.state.address}
              />
              <TextInput
                placeholder="contact"
                style={{
                  width: 280,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  marginTop: 30,
                }}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
                value={this.state.contact}
                keyboardType={'numeric'}
              />
              <TextInput
                placeholder="email id"
                style={{
                  width: 280,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  marginTop: 30,
                }}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
                value={this.state.emailId}
                keyboardType={'email-address'}
              />
              <TextInput
                placeholder="password"
                style={{
                  width: 280,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  marginTop: 30,
                }}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
                secureTextEntry={true}
              />
              <TextInput
                placeholder="confirm password"
                style={{
                  width: 280,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  marginTop: 30,
                }}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                value={this.state.confirmPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  backgroundColor: '#ff0000',
                  borderRadius: 6,
                  shadowOffset: {
                    width: 3,
                    height: 3,
                  },
                  shadowRadius: 3,
                  elevation: 30,
                  shadowOpacity: 0.2,
                }}
                onPress={() => {
                  this.signup(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => this.setState({ modal: false })}>
                <Text style={{ textDecorationLine: 'underline' }}>cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  };
  render() {
    console.log(this.state.name);
    return (
      <View style={{ backgroundColor: '#1d9953', height: '100%' }}>
        <View>{this.showModal()}</View>

        <Text
          style={{
            fontSize: RFValue(38),
            color: '#11042b',
            alignSelf: 'center',
            fontWeight: 'bold',
            marginTop: RFValue(200),
          }}>
          Bidding App
        </Text>
        <Text
          style={{
            fontSize: RFValue(18),
            color: 'indigo',
            alignSelf: 'center',
          }}>
          A Simple App
        </Text>
        <TextInput
          placeholder="abc@gmail.com"
          style={{
            width: 360,
            height: 50,
            borderBottomWidth: 2,
            marginLeft: RFValue(10),
            marginTop: RFValue(60),
            fontSize: RFValue(20),
          }}
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="password"
          style={{
            width: 360,
            height: 50,
            borderBottomWidth: 2,
            marginLeft: RFValue(10),
            marginTop: RFValue(30),
            fontSize: RFValue(20),
          }}
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => this.setState({ modal: true })}
          style={{
            borderWidth: 2,
            marginTop: 30,
            alignSelf: 'center',
            backgroundColor: '#11042b',
            width: 300,
            borderRadius: 20,

            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 30 ,color:'white'}}>sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            marginTop: 30,
            alignSelf: 'center',
            borderRadius: 30,
            width: 300,
            alignItems: 'center',
            backgroundColor: '#11042b',
          }}
          onPress={() => {
            this.signin(this.state.emailId, this.state.password);
          }}>
          <Text style={{ fontSize: 30, fontFamily: 'sans-serif',color:'white' }}>
            sign in
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
