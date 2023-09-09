import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';

const Botavatar = require('./img/perro.jpg');

const BOT ={
    _id: 2,
    name: 'PerritoBot',
    avatar: Botavatar,  
}

class Chatbot extends Component {

    state ={
        messages: [
            {_id: 2, text: 'Hola soy perro-bot', createdAt: new Date(), user: BOT},
            {_id: 1, text: 'hola', createdAt: new Date(), user: BOT},
        ],
        id: 1,
        name: '',
    };

    componentDidMount(){
        Dialogflow_V2.setConfiguration(dialogflowConfig.client_email, dialogflowConfig.private_key, Dialogflow_V2.LANG_SPANISH, dialogflowConfig.project_id);
    }

    handleGoogleResponse(result){
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];

        this.senBotResponse(text);
    }

    senBotResponse(text){
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user : BOT
        }

        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, [msg]),

        }));
    }

    onSend(messages =[]){
        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, messages)
        }))
        let message = messages[0].text;

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }


    onQuickReply(quickReply){
        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, quickReply)
        }))
        let message = quickReply[0].value;

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        )
        
    }


    render() {
        return (

            <View style ={{flex: 1, backgroundColor: '#fff'}}>
              <Text></Text>
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