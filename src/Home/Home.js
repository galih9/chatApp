import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Keyboard
} from "react-native";
import { Icon } from "native-base";
import configs from "../../config/config";
const axios = require("axios");

// import ChatScreen from '../component/chat';
// import MyChatScreen from '../component/mychat';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      date: "",
      token: "",
      userId: "",
      roomId: "",
      textMsg: "",
      fillToken: ""
    };
  }

  async componentWillMount() {
    that = this;
    const { navigation } = this.props;
    const roomId = await navigation.getParam("roomId");
    const userId = await navigation.getParam("userId");
    console.log("ini room id", userId);
    const valueToken = await AsyncStorage.getItem("token");
    this.setState.fillToken = valueToken;
    this.setState({
      token: valueToken,
      roomId: roomId,
      userId: userId
    });
    // const id = await AsyncStorage.getItem("id")
    let config = {
      headers: {
        Authorization: "Bearer " + valueToken
      }
    };

    axios
      .get(
        `http://${configs.ipaddress}:3333/api/v1/messages/room/${
          this.state.roomId
        }`,
        config
      )
      .then(function(response) {
        console.log(that.state.userId);
        that.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get(`http://${configs.ipaddress}:3333/api/v1/profile`, config)
      .then(async function(response) {
        //console.log(response.data.id);
        that.setState.userId = response.data.id;
      })
      .catch(function(e) {
        console.log(e);
      });

    setInterval(this._getData, 1500);
  }

  _getData = async () => {
    that = this;
    const valueToken = await AsyncStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + valueToken
      }
    };
    axios
      .get(
        `http://${configs.ipaddress}:3333/api/v1/messages/room/${
          that.state.roomId
        }`,
        config
      )
      .then(function(response) {
        console.log(response);
        that.setState({ data: response.data });
      })

      .catch(function(error) {
        console.log(error);
      });
  };

  handleSend = () => {
    that = this;
    let config = {
      headers: {
        Authorization: "Bearer " + that.state.fillToken
      }
    };
    axios
      .post(
        `http://${configs.ipaddress}:3333/api/v1/messages`,
        {
          room_id: this.state.roomId,
          user_id: this.state.userId,
          text_chat: this.state.textMsg
        },
        config
      )
      .then(function(response) {
        () =>
          that.setState({
            textMsg: null
          });
        console.log(response);
        Keyboard.dismiss();
      })
      .catch(function(error) {
        console.log(error);
        alert("pastikan jaringanmu terhubung");
      });
  };

  render() {
    return (
      <View style={styles.chat}>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10
          }}
        >
          <View style={{ margin: 10, flex: 1, flexDirection: "row" }}>
            <TouchableOpacity onPress={() => alert("woy")}>
              <Icon name="ios-arrow-back" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, marginLeft: 20 }}>
              <Text> Chat Room 1 </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <FlatList
            style={styles.chat}
            data={this.state.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={
                  item.userinfo[0].id == this.state.userId
                    ? styles.wrapchatme
                    : styles.wrapchat
                }
                onLongPress={() => this.handleManipulate}
              >
                <View>
                  <View>
                    <View>
                      <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                        {item.userinfo[0].username}
                      </Text>
                      <Text note style={{ textAlign: "right" }}>
                        10:10
                      </Text>
                    </View>
                    <Text style={{ textAlign: "left" }}>{item.text_chat}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <View style={styles.inputText}>
          <TextInput
            style={{
              width: "80%",
              height: 40,
              borderWidth: 1,
              backgroundColor: "white",
              paddingHorizontal: 10,
              borderRadius: 15
            }}
            placeholder="Kirim pesan ..."
            onChangeText={text =>
              this.setState({
                textMsg: text
              })
            }
          />
          <Button
            title="Kirim"
            style={{ backgroundColor: "yellow" }}
            onPress={this.handleSend}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    backgroundColor: "transparent",
    backgroundColor: "white"
  },
  inputText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderRadius: 20
  },
  wrapchat: {
    width: "80%",
    margin: 10,
    height: 65,
    padding: 3,
    backgroundColor: "#5cfc51",
    borderRadius: 3,
    marginRight: 10
  },
  wrapchatme: {
    width: "75%",
    margin: 10,
    marginLeft: "20%",
    height: 65,
    padding: 3,
    backgroundColor: "cyan",
    borderRadius: 3,
    marginRight: 10
  }
});
export default HomeScreen;
