import React,{ Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

class MyChatScreen extends Component{
    render(){
        return(
            <View style={{width : '80%',margin : 10, height : 50,backgroundColor:'green',borderRadius:3,marginRight:10}}>
                <FlatList
                    style={styles.chat}
                    data={[{title: 'Title Text', key: 'item1'}]}
                    keyExtractor={(item,index)=>index}
                    renderItem={({item}) => (
                        <TouchableHighlight
                        >
                            <View style={{width : '80%',margin : 10, height : 65,padding:3,backgroundColor:'#5cfc51',borderRadius:3,marginRight:10}}>
                                    <View>
                                    <View>
                                        <Text style={{textAlign: 'left',fontWeight:'bold'}}>Nama user</Text>
                                        <Text note style={{textAlign: 'right'}}>2019-08-19</Text>
                                    </View>
                                        <Text style={{textAlign: 'left'}}>isi chat</Text>
                                    </View>
                                </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        )
    }
} 
export default MyChatScreen