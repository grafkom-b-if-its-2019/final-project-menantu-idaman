import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, View, Text, Button, Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import io from 'socket.io-client'

const style = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    },
    box : {
        height: 100,
        width: 100,
        backgroundColor: 'red'
    }
});

export default class App extends React.Component
{
    constructor()
    {
        super();
        this.socket = io('http://192.168.2.2:3000');
    }

    componentDidMount()
    {
        this.socket.emit('direction', 'right');
    }

    sendDirection(dir)
    {
        this.socket.emit('direction', dir);
    }

    render()
    {
        return(
            <View style={style.container}>
               <Swipeable>

               </Swipeable>
            </View>
        );
    }
}