import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
import { format } from 'date-fns';
import { Image } from 'react-native';

const Botavatar = require('./../img/perro.jpg');
const Useravatar = require('./../img/avatar.jpg');

const BOT = {
  _id: 2,
  name: 'PerritoBot',
  avatar: Botavatar,
};


class Chatbot extends Component {
  state = {
    messages: [
      {
        _id: 2,
        text: 'Soy el perro-bot tu asistente, ¿Qué necesitas?',
        createdAt: new Date(),
        user: BOT,
      },
      {
        _id: 1,
        text: 'Hola!',
        createdAt: new Date(),
        user: BOT,
      },
    ],
  };

  

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_SPANISH,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }

  onQuickReply(quickReply) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, quickReply),
    }));
    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }


  formatChatDate(date) {
    return format(date, "dd/MM/yyyy HH:mm"); // Cambia el formato según tus preferencias
  }

 


  render() {
   
    
  

    return (
      <SafeAreaView style={{ flex: 1 }}>
    
        
        {/* Renderizamos el chat si está abierto */}
      
          <View style={{flex:1, backgroundColor: '#96eafc', zIndex:99999, height:'100%',}}>
            <GiftedChat
              messages={this.state.messages}
              onSend={(message) => this.onSend(message)}
              onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
              user={{
                _id: 1,
                avatar: Useravatar, // Agrega la imagen del usuario
              }}
              renderBubble={(props) => (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    left: {
                      backgroundColor: '#ffffa2', // Color de fondo de los mensajes del bot
                    },
                    right: {
                      backgroundColor: '#00ffff', // Color de fondo de los mensajes del usuario
                    },
                  }}
                  textStyle={{
                    left: {
                      color: 'black', // Color del texto de los mensajes del bot
                    },
                    right: {
                      color: 'black', // Color del texto de los mensajes del usuario
                    },
                  }}
                />
              )}
              
              dateFormat={'ll HH:mm'} // Establece el formato de la fecha
              locale={'es'} // Establece el idioma a español
            />
          </View>
      </SafeAreaView>
    );
  }
}



export default Chatbot;
