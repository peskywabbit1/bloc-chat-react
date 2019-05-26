import React, {Component} from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[],
      activeRoomID: []

  };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessages = this.createMessages.bind(this);
  }
componentDidMount() {
    this.messagesRef.on('child_added', snapshot => { /*snapshot is the data*/
      const message = snapshot.val();/*value of text */
      message.key = snapshot.key;/* snapshot.key is the data key */
      this.setState({ messages: this.state.messages.concat( message )}, () => {
        this.props.setActiveRoom(this.props.activeRoom);
  });
  });
  }


    /*filter results by the ID of the active room*/
createMessages(newMessage) {
  this.messagesRef.push({
    username: "Guest",
    content: newMessage,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom.key
  });
  }


render() {
  /*MessageList page will go here*/
  return (
    <div className="messagelist">

      <h3>{this.props.activeRoom ? this.props.activeRoom.name : " "}</h3>
    <ul> {
        this.state.messages.filter(message => message.roomId === this.props.activeRoom).map( message => {
      return (
        <li key={message.key}>
          <div>{message.username}</div>
          <div>{message.content}</div>
          <div>{message.sentAt}</div>
          <div>{message.roomId}</div>
      </li>
    )}
    )}
    </ul>
    </div>
    );
  }
}

export default MessageList;
