import React,{ Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

class ChatScreen extends Component{
    render(){
        return(
            <View style={{width: "70%"}}>
                <View style={{width : '80%',margin : 10, height : 60,backgroundColor:'#5cfc51',margin:10,borderRadius:3}}>
                    <View style={{margin: 2}}>
                        <Text style={{textAlign: 'left',fontWeight:'bold'}}>isi chat</Text>
                        <Text style={{textAlign: 'right'}}>2019-08-19</Text>
                        <Text style={{textAlign: 'left'}}>halu</Text>
                    </View>
                </View>
            </View>
        )
    }
} 
export default ChatScreen