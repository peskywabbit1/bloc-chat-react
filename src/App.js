import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCElMHJJZ7XKkJqXnYtgRt4aOGdCZRgHyQ",
    authDomain: "bloc-chat-react-1222.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-1222.firebaseio.com",
    projectId: "bloc-chat-react-1222",
    storageBucket: "bloc-chat-react-1222.appspot.com",
    messagingSenderId: "530788154608",
    appId: "1:530788154608:web:9cd6542aad303b0a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
                    activeRoom: '',
                    activeRoomId: '',
                    user: ''
      }
    }

    updateRoom(roomId){
      if (roomId === '') {
        this.setState({activeRoomId: '', activeRoom: ''})
      } else {
      this.setState({activeRoomId: roomId.key, activeRoom: roomId.name});
      }
    }

    setUser(currentUser){
      this.setState({user: currentUser});
      console.log(currentUser);
    }

    render() {
      return (
        <div className="App">
          <nav className="room-navigation">
            <header className="App-header">
              <h1>Bloc Chat</h1>
            </header>
            <div className="logIn">
              <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
            </div>
            <RoomList firebase={firebase}
                      updateRoom={this.updateRoom.bind(this)}
                      activeRoomId={this.state.activeRoomId}
                      activeRoom={this.state.activeRoom}/>
          </nav>
          <section className="message-list">
          <MessageList firebase={firebase}
                         activeRoom = {this.state.activeRoom}
                         activeRoomId = {this.state.activeRoomId}
                         user = {this.state.user}/>
          </section>
        </div>
      );
    }
  }

  export default App;
