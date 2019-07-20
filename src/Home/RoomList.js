import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  TouchableHighlight,
  Alert
} from "react-native";
import {
  Icon,
  Content,
  List,
  Text,
  Thumbnail,
  ListItem,
  Left,
  Body,
  Right
} from "native-base";
import configs from '../../config/config';

const axios = require("axios");

// import ChatScreen from '../component/chat';
// import MyChatScreen from '../component/mychat';

class RoomList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      date: "",
      token: "",
      roomId: "",
      userId: "",
      username: "",
      textMsg: ""
    };
  }

  async componentWillMount() {

    that = this;
    const valueToken = await AsyncStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + valueToken
      }
    };

    axios
      .get(`http://${configs.ipaddress}:3333/api/v1/rooms`, config)
      .then(function(response) {
        // console.log(response.data);
        that.setState({ data: response.data });
        // console.log(response.data);
        
      })
      .catch(function(error) { 
        console.log(error);
      })

      axios.get(`http://${configs.ipaddress}:3333/api/v1/profile`, config)
      .then(async function(response){        
        console.log(response.data.id);
        that.setState({userId : response.data.id})
      })
      .catch(function(e){
        console.log(e);
      })
      
    }

  // handleRoom = () => {
  //   this.props.navigation.navigate("Home",{
  //     roomId:item.id,
  //     userId:this.state.userId
  // });
  // };

  handleLogout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.chat}>
        <Content>
          <View style={{ height: "100%", backgroundColor: "grey" }}>
            <FlatList
              style={styles.chat}
              data={this.state.data}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={()=>this.props.navigation.navigate('Home',{
                            roomId:item.id,
                            userId: this.state.userId
                        })}
                >
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "white",
                      height: 80,
                      flexDirection: "row",
                      borderRadius: 15,
                      marginVertical: 10
                    }}
                  >
                    <View style={{marginRight:10}}>
                      <Thumbnail
                        source={{
                          uri:
                            "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text note>p</Text>
                    </View>
                    <Right>
                      <Text note>3:45 pm</Text>
                    </Right>
                    <Text />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    backgroundColor: "transparent"
  },
  inputText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderRadius: 20
  }
});
export default RoomList;
