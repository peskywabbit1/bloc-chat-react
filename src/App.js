import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
      rooms: []
    };
  }

  render() {
    return (
      <div className="App">
          <nav>
          <header>
            <h1 className="App-title">Bloc Chat</h1>
          </header>
          </nav>
        <main>
           <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
