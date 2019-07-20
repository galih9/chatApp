import React, { Component } from 'react';
import {
  View,
  Alert,
  StyleSheet,
} from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import configs from '../config/config';
const axios = require('axios');

class FormLogin extends Component {
  constructor(){
  super()
  this.state = {
      email : '',
      password : '',
      hidden: true
    }
  }

  handleSubmit(){
    that=this
    axios.post(`http://${configs.ipaddress}:3333/api/v1/login`, 
    {
      'email' : this.state.email,
      'password' : this.state.password
    })
    .then(async function(response){
        
        // console.log(response.data.token)
        AsyncStorage.setItem('token', response.data.token)
        // AsyncStorage.setItem('token', response.data.token)
        that.props.navigation.navigate('Room')
    })
    .catch(function(e){
      console.log(e);
      Alert.alert("akun gak ketemu")
        
    })
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>
        <Content style={{marginTop: "30%"}}>
        <View style={{margin: 30}}>
          <Text style={{fontWeight: 'bold',fontSize: 20,padding:10}}>CHAT APP</Text>
        </View>
          <Form >
            <Item  style={{borderRadius: 5,backgroundColor: 'grey',marginRight: 10}}>
              <Input
              style={{paddingLeft:20}}
              placeholder="Email"
              onChangeText={(text)=>this.setState({
                email:text
              })} />
              
            </Item>
            <Item  style={{borderRadius: 5,backgroundColor: 'grey',marginRight: 10,marginLeft:14}} last>
              <Input 
              secureTextEntry={this.state.hidden} 
              placeholder="Password"
              onChangeText={(text)=>this.setState({
                password:text
              })} 
              />
              <Icon name='ios-eye' onPress={ () => this.setState({ hidden: !this.state.hidden })}/>
            </Item>
            <View style={{marginLeft: 10,flex:1, flexDirection: 'row'}}>
            <Button 
            block
            primary
            style={styles.btn}
            // onPress={()=>this.props.navigation.navigate('Home')}
            // onPress={()=> alert(this.state.email)}
            onPress={(e)=>this.handleSubmit(e)}
            >
              
              <Text>Login</Text>
            </Button>

            <Button 
            block
            success
            style={styles.btn}
            //onPress={()=>this.props.navigation.navigate('Home')}
            onPress={()=> this.props.navigation.navigate('Reg')}
            >
            
              <Text>Buat Akun</Text>
            </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn : {
    margin : 10
  }
})

export default FormLogin