import React, {Component} from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[],
      showMessages: " "
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessages = this.createMessages.bind(this);
  }
componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState( { messages: this.state.messages.concat( message )}, () => {
        this.showMessages(this.props.activeRoom)
      });
    }


createMessages(newMessage) {
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
      <h3>{this.props.activeRoom ? this.props.activeRoom.name : " "}</h3>
    <ul> {
        this.state.messages.map( message => {
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
