import React, { Component } from 'react';
import {Button,TouchableOpacity,Text,AsyncStorage,Alert} from 'react-native';
import { createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation';

import FormLogin from './src/Login';
import HomeScreen from './src/Home/Home';
import RoomList from './src/Home/RoomList';
import Register from './src/Register/Register';
import Test from './test';

class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}




const AppNavigator = createStackNavigator({
  
  // Test : {
  //   screen : Test,
  //   navigationOptions: ({ navigation }) => ({
  //     header: null,
  //   })
  // },

  Login : {
    screen : FormLogin,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  
  Home : {
    screen : HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },

  Room : {
    screen : RoomList,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      title: `Room List`,
      headerRight: (
        
        <Button
          onPress={()=>Alert.alert(   // Shows up the alert without redirecting anywhere
            'Confirmation required'
            ,'Do you really want to logout?'
            ,[
              {text: 'Accept', onPress: () => { navigation.dispatch( NavigationActions.navigate({ routeName: 'Login' }))}},
              {text: 'Cancel'}
              ]
          )}
          title="LOGOUT"
          color="#000"
          
        />
      ),
    })
  },
  Reg : {
    screen : Register,
    navigationOptions: ({ navigation }) => ({
      title: `Create New Account`,
  }),

  
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default App