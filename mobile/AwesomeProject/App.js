import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, View, Text, Button, Animated} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import io from 'socket.io-client'

import {  } from 'react-native-gesture-handler/'

const style = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#000',
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

    constructor(props) {
        super(props);
        this.socket = io('https://habib-tampan.azurewebsites.net');
        this.state = {
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            backgroundColor: '#fff'
          };
        
        this.onSwipeUp = this.onSwipeUp.bind(this);
        this.onSwipeDown = this.onSwipeDown.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        
      }
    
      onSwipeUp(gestureState) {
        this.socket.emit('direction', 'up');
        this.setState({myText: 'You swiped up!'});
      }
    
      onSwipeDown(gestureState) {
        this.socket.emit('direction', 'down');
        this.setState({myText: 'You swiped down!'});
      }
    
      onSwipeLeft(gestureState) {
        this.socket.emit('direction', 'left');
        this.setState({myText: 'You swiped left!'});
      }
    
      onSwipeRight(gestureState) {
        this.socket.emit('direction', 'right');
        this.setState({myText: 'You swiped right!'});
      }
    
    
      render() {
    
        const config = {
          velocityThreshold: 0.05,
          directionalOffsetThreshold: 100
        };
    
        return (

          <GestureRecognizer
            onSwipeUp={ this.onSwipeUp }
            onSwipeDown={ this.onSwipeDown }
            onSwipeLeft={ this.onSwipeLeft }
            onSwipeRight={ this.onSwipeRight }
            config={config}
            style={{
              flex: 1,
              backgroundColor: this.state.backgroundColor
            }}
            >
                <Text style={ {alignContent:"center"}}>{this.state.myText}</Text>
          </GestureRecognizer>


        );
      }
}