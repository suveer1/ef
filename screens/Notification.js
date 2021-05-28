import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import { Input, Icon ,ListItem,Card} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import { Modal } from 'react-native';
import { Alert } from 'react-native';


export default class Notification extends Component{
  constructor(){
   super();
   this.state={all:'',m:false,name:'',l:''}

  }
  get(){
    db.collection('notification')
    .where('targeteduserid','==',firebase.auth().currentUser.email)
    .where('status','==','unread')
    .onSnapshot((snapshot)=>{
      var a=[]
      snapshot.forEach((doc)=>{
        a.push(doc.data())
      })
      this.setState({all:a})
    })
    db.collection('users').where('emailId','==',firebase.auth().currentUser.email)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({name:doc.data().name,l:doc.data().contact})
      })
    })
  }
  componentDidMount(){
    this.get()
  }
  sell(a){
    db.collection('notification').add({
      targeteduserid:a.currentuser,
      message:this.state.name + 'has sent u the item' + a.itemname + 'please click on recieved once u recieve the order',
      type:'send'
    })
  }
add(){}
  keyExtractor=(item,i)=>i.toString()
  modal(i){
    <Modal
    animationType='slide'
    visible={this.state.visible}
    >
      <Card>
        <Card>
          <Card.Title>item name : {i.itemname}</Card.Title>
          
        </Card>
        <Card>
          <Card.Title>buyer name : {i.buyername}</Card.Title>
        </Card>
        <Card>
          <Card.Title>purchasing price : {i.price}</Card.Title>
        </Card>
        <TouchableOpacity style={{marginTop:30,width:300,height:40,alignItems:'center',alignSelf:'center',backgroundColor:'blue'}}
        onPress={()=>{this.sell(i)}}
        >
          <Text>
            accept and sell
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:30,width:300,height:40,alignItems:'center',alignSelf:'center'}}>
          <Text>
            keep it for later
          </Text>
        </TouchableOpacity>
      </Card>
    </Modal>
  }
  renderItem=({item})=>{
    return(

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.message}</ListItem.Title>
          {item.type === 's' ? 
                <TouchableOpacity style={{marginLeft:'75%',backgroundColor:'yellow'}} 
                onPress={()=>{this.setState({m:true})
                Alert.alert('item sent')
                }}>
                    <Text>see More</Text>
                  </TouchableOpacity>
                  :( null)
        }

        </ListItem.Content>
      </ListItem>
    )
  }
  render(){
    return(
      <View>
        {this.state.all.length === 0 ?<Text>you have no notification</Text>:(
          <FlatList 
          keyExtractor={this.keyExtractor}
          data={this.state.all}
          renderItem={this.renderItem}
          />
        )}
      </View>
    )
  }
}