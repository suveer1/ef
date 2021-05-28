import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ToastAndroid
} from 'react-native';
import { Input, Icon ,ListItem,Card,Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

export default class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      image:this.props.navigation.getParam('details')['image'],
      userid:this.props.navigation.getParam('details')['user'],
      itemname:this.props.navigation.getParam('details')['item'],
      value:this.props.navigation.getParam('details')['minimumbidvalue'],
      contact:'',
      name:'',
      id:this.props.navigation.getParam('details')['id'],
      iv:'',
      cn:'',
      location:'',
      phine:""
    }
  }
  get=()=>{
    db.collection('users').where('emailId','==',this.state.userid)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var d= doc.data()
        this.setState({contact:d.contact,name:d.name})
      })
    })
    db.collection('users').where('emailId','==',firebase.auth().currentUser.email)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var a = doc.data()
        this.setState({cn:a.name,location:a.location,phine:a.contact})
      })
    })
  }
componentDidMount(){
  this.get()
}
update=()=>{
  db.collection('add').where('id','==',this.state.id)
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      db.collection('add').doc(doc.id).update({
        status:'read'
      })
    })
  })
  db.collection('notification').add({
    
    targeteduserid:this.state.userid,
    currentuser:firebase.auth().currentUser.email,
    message: this.state.cn +' want to take your item ' + this.state.itemname + ' at the rate of '  + this.state.iv,
    status:'unread',
    id:this.state.id,
    buyername:this.state.cn,
    itemname:this.state.itemname,
    price:this.state.iv,
    type:'s',
    buyercontact:this.state.phine
  })
}
  render(){
    return(
      <View style={{alignItems:'center'}}>
                  <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.navigate('Home')}
              />
            }
            centerComponent={{text:'Details'}}
            />
        <Card style={{}}>
          <Image source={{uri:this.state.image}} style={{width:100,height:100,borderWidth:2,alignSelf:'center'}}/>
        <Card>
          <Card.Title style={{width:300}}>{this.state.itemname}</Card.Title>
        </Card>
        <Card>
          <Card.Title >{this.state.value}</Card.Title>
        </Card>
        </Card>


        <Card>

        <Card>
          <Card.Title style={{width:300}}>{this.state.name}</Card.Title>
        </Card>
            <Card>
              <Card.Title>{this.state.contact}</Card.Title>
            </Card>
            <TextInput 
            placeholder={'the rate u want sell at(rupees)'}
            onChangeText={(text)=>{this.setState({iv:text})}}
            style={{borderWidth:2,alignSelf:'center'}}
            />
        </Card>
            <TouchableOpacity style={{backgroundColor:'skyblue',width:150,marginTop:30,alignItems:'center',height:30}}
            onPress={()=>{this.update() 
              ToastAndroid.showWithGravity('requested succsefully',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
              this.props.navigation.navigate('Home')
            }}
            
            ><Text>request</Text></TouchableOpacity>
      </View>
    )
  }
}