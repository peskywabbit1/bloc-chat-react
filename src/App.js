import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'
import User from './components/User'

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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user:""
    };
    this.setActiveRoom=this.setActiveRoom.bind(this);
    this.setUser=this.setUser.bind(this);
  }

  setActiveRoom(roomId) {
    this.setState({
      activeRoom:roomId});
  }

  setUser(user) {
    this.setState ({
      user: user
    });
    }

  render() {
    return (
      <div className="App">
          <header>
            <h1 className="App-title">Bloc Chat</h1>
            <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)}/>
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom= {this.setActiveRoom.bind(this)}/>
            <User firebase={firebase} user={this.state.user} setUser={this.setUser.bind(this)}/>
          </header>
      </div>
    );
  }
}
export default App;
