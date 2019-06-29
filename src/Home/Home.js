import React, {Component} from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
} from 'react-native';
import {
  Footer,
  Input,
  Item,
  FooterTab,
  Content
} from 'native-base';
import ChatScreen from '../component/chat'
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends Component {
  componentDidMount(){
    alert('hello');
  }

  render(){
    return(
      <View>
        <ScrollView>
          <ChatScreen />
          <ChatScreen />
          <ChatScreen />
        </ScrollView>

      <Footer>
        <FooterTab>
        <Item>
          <Input placeholder='text'/>
        </Item>
        </FooterTab>
      </Footer>

      </View>
    )
  }
} 
export default HomeScreen