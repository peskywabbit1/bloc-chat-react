import React, {Component} from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[],
      newMessage: " ",
      showMessages: " "
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }//set up real time event listeners for the database
componentDidMount() {
    this.messagesRef.on('child_added', snapshot => { //to read message data
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState( { messages: this.state.messages.concat( message )}, () => {
        this.showMessages(this.props.activeRoom)
        });
      });
    }

createMessages(newMessage) { // to create new message data
  this.messagesRef.push({
    username: "Guest",
    content: newMessage,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom.key
  });
  }

  render() {
    return (
      <div>
      <h3>{{this.props.activeRoom ? this.props.activeRoom.name : " "}}</h3>
    <ul> {
        this.state.newMessage.map( message => {
      <li key={message.key}>
          <div>{message.username}</div>
          <div>{message.content}</div>
          <div>{message.sentAt}</div>
      </li>
      }
    )}
    </ul>
    </div>
    );
  }
}

export default MessageList;
