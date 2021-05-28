import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import { Input, Icon ,ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import Head from './Header'
import { Alert } from 'react-native';
export default class Home extends React.Component{
constructor(){
  super();
  this.state={allitems:''}
}
getData=()=>{
  db.collection('add')
  .where('status','==','unread')
  .onSnapshot((snapshot)=>{
    var all = []
    snapshot.forEach((doc)=>{
      all.push(doc.data())
      
    })
    this.setState({allitems:all})
  })
 
}
componentDidMount(){
  this.getData()
}
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

keyExtractor=(item,i)=>i.toString()
renderItem=({item,i})=>{
  console.log('itemuser'+item.user)
  return(
<ListItem bottomDivider>
  <ListItem.Content>
    <ListItem.Title style={{fontWeight:'bold'}}><Image source={{uri:item.image}} style={{width:30,height:30}}/>  {item.item}</ListItem.Title>
  <ListItem.Subtitle style={{marginLeft:40}}>{'minimum value    ' + item.minimumbidvalue}</ListItem.Subtitle>
  {firebase.auth().currentUser.email === item.user ?
    <TouchableOpacity style={{marginLeft:'75%',borderWidth:1,marginTop:-25,backgroundColor:'orange'}}

    onPress={()=>{this.props.navigation.navigate('Re',{details:item})}}
    >
      <Text>Details</Text>
    </TouchableOpacity>
    :(  <TouchableOpacity style={{marginLeft:'75%',borderWidth:1,marginTop:-25,backgroundColor:'orange'}}

    onPress={()=>Alert.alert("u cannot sell item yourself")}
    >
      <Text>Details</Text>
    </TouchableOpacity>)
}
  </ListItem.Content>
</ListItem>
  )
}
render(){
  console.log(this.state.allitems)
  return(
    <View >
      <Head t='HomeScreen' navigation={this.props.navigation}/>
      {
        this.state.allitems.length===0?
        <Text>there are no added items</Text>
        :(
          <FlatList 
          keyExtractor={this.keyExtractor}
          data={this.state.allitems}
          renderItem={this.renderItem}
          
          />
        )
      }
    </View>
  )
}
}