import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
import { format } from 'date-fns';

const Botavatar = require('./../img/perro.jpg');

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
    id: 1,
    name: '',
    isChatOpen: false, // Agregamos un estado para controlar la apertura y cierre del chat
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

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#38f5f5', // Color para los mensajes de la persona
          },
          left: {
            backgroundColor: '#E5E5EA', // Color para los mensajes del bot
          },
        }}
      />
    );
  }

  formatChatDate(date) {
    return format(date, "dd/MM/yyyy HH:mm"); // Cambia el formato según tus preferencias
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Text style={{ color: '#0084FF' }}>Enviar</Text> {/* Cambia el texto aquí */}
        </View>
      </Send>
    );
  }

  toggleChat() {
    this.setState((prevState) => ({
      isChatOpen: !prevState.isChatOpen,
    }));
  }

  render() {
    const { isChatOpen } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Agregamos un botón para abrir/cerrar el chat */}
        <TouchableOpacity
          onPress={() => this.toggleChat()}
          style={{
            position: 'absolute',
            bottom: 60,
            right: 10,
            backgroundColor: '#0084FF',
            borderRadius: 30,
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Chat</Text>
        </TouchableOpacity>
        
        {/* Renderizamos el chat si está abierto */}
      
          <View style={{flex:1, backgroundColor: '#FAF3E0', zIndex:99999, height:'100%',}}>
            <GiftedChat
              messages={this.state.messages}
              onSend={(message) => this.onSend(message)}
              onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
              user={{ _id: 1 }}
              //renderBubble={this.renderBubble} // Utiliza la función renderBubble
              dateFormat={'ll HH:mm'} // Establece el formato de la fecha
              locale={'es'} // Establece el idioma a español
            />
          </View>
      </SafeAreaView>
    );
  }
}

export default Chatbot;
