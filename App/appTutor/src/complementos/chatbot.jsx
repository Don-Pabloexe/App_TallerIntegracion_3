import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';

const Botavatar = require('./../img/perro.jpg');

const BOT ={
    _id: 2,
    name: 'PerritoBot',
    avatar: Botavatar,  
}

class Chatbot extends Component {

    state ={
        messages: [{_id: 2, text: 'mi nombre es perrito-bot', createdAt: new Date(), user: BOT},
        {_id: 1, text: 'hola', createdAt: new Date(), user: BOT},
    ],

        id: 1,
        name: '',
    };

    onSend(messages = []){

    }   

    onQuickReply(quickReply){

    }

    render() {
        return (
          
            <View style ={{flex: 1, backgroundColor: 'red'}}>
                <GiftedChat 
                messages={this.state.messages}
                onSend={(message) => this.onSend(message)}
                onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
                user={{_id: 1}}

                /> 
            </View>
        
        );
    }
}


export default Chatbot;