import React, { Component } from 'react';
import {
  View,
  Alert,
  StyleSheet,
} from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Icon } from 'native-base';
import configs from '../../config/config';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
const axios = require('axios');

class Register extends Component {
  constructor(){
  super()
  this.state = {
      username : '',
      email : '',
      password : '',
      hidden: true
    }
  }

  // handleSubmit(){
  //   that=this
  //   axios.post('http://192.168.0.9:3333/api/v1/login', 
  //   {
  //     'email' : this.state.email,
  //     'password' : this.state.password
  //   })
  //   .then(async function(response){
        
  //       // console.log(response.data.token)
  //       AsyncStorage.setItem('token', response.data.token)
  //       Alert.alert("akun berhasil dibuat silahkan login")
  //   })
  //   .catch(function(e){
  //     Alert.alert("Gagal, silahkan coba lagi atau tunggu beberapa saat")
        
  //   })
  // }

  handleReg(){
    that=this
    axios.post(`http://${configs.ipaddress}:3333/api/v1/users`, 
    {
      'name' : this.state.inputName,
      'email' : this.state.inputEmail,
      'phone' : this.state.inputPhone
    })
    .then(function(response){
        
      console.log(response)
      this.props.navigation.navigate('Gate')
    })
    .catch(function(err){
      console.log(err)
      this.props.navigation.navigate('Sign')
        
    })
  }

  handleReset(){
    this.setState({
      username : "",
      email : "", 
      password : ""
    })
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>
         <Form>
            <Item>
              <Input placeholder="Username" 
                onChangeText={(text)=>this.setState({
                  username:text
                })}
                
              />
            </Item>
            <Item>
              <Input 
              placeholder="Email" 
              onChangeText={(text)=>this.setState({
                email:text
              })}

              />
            </Item>
            <Item last>
              <Input 
              placeholder="Password" 
              onChangeText={(text)=>this.setState({
                password:text
              })} 
              />
            </Item>
            <View style={{alignSelf:'center', marginTop: 20,flex:1,flexDirection:'row'}}>
            <Button success style={{padding: 10,marginRight:10}} onPress={()=>this.handleReg()}>
              <Text>
                Buat Akun
              </Text>
            </Button>
            <Button danger style={{padding: 10}} onPress={this.handleReset.bind(this)}>
              <Text>
                Reset
              </Text>
            </Button>
            </View>
          </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn : {
    margin : 10
  }
})

export default Register