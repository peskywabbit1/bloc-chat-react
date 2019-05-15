import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


 src="https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js"
  var firebaseConfig = {
    apiKey: "AIzaSyCElMHJJZ7XKkJqXnYtgRt4aOGdCZRgHyQ",
    authDomain: "bloc-chat-react-1222.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-1222.firebaseio.com",
    projectId: "bloc-chat-react-1222",
    storageBucket: "bloc-chat-react-1222.appspot.com",
    messagingSenderId: "530788154608",
    appId: "1:530788154608:web:afffe7841721f2fc"
  };

firebase.initializeApp(firebaseConfig);


class App extends Component {
  render () {
    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/'>RoomList</Link>
          </nav>
          <h1>Bloc Chat</h1>
        </header>
        <main>
        Route exact path="/" component={RoomList} />
        </main>
      </div>
    );
  }
}

export default App;
