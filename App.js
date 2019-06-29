import React, { Component } from 'react';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import FormLogin from './src/Login';
import HomeScreen from './src/Home/Home';

class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const AppNavigator = createStackNavigator({
  Login : {
    screen : FormLogin,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  Home : {
    screen : HomeScreen
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default App