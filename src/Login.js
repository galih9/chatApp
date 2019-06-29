import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import axios from 'axios';

class FormLogin extends Component {
  constructor() {
    super();
    this.state = {
      email : '',
      password : '',
    }
  }


  // componentDidMount(){
  //   const headers = {
  //     'Authorization': 'Bearer ' + this.props.jwt
  //   };
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:3000/user',
  //     headers: headers,
  //   })
  // }

  render() {

    // axios.post('/user', {
    //   email: '',
    //   password: '' 
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Email">{/*email*/}</Input>
            </Item>
            <Item last>
              <Input secureTextEntry={true} placeholder="Password">{/* password */}</Input>
            </Item>
            <Button
            block 
            primary
            // style={{marginTop:10,marginLeft: 30}}
            onPress={()=>this.props.navigation.navigate('Home')}
            >
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default FormLogin