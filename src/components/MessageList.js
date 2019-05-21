import React, {Component} from 'react';




class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  //set up real time event listeners for the database
componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message )}, //() => {
    //  this.showMessages( this.props.activeRoom )
  //  }
  );
    });
  }
//filter method by Id of Active Room props.activeRoom
//  getMessagesForRoomId(room){
    //room.id


  render () {
    const messages = this.state.messages.filter((message) => this.props.setActiveRoom.key === messages.roomId).map(
      console.log('this is our stuff', this.props.setActiveRoom.key, this.message.roomId));
    return (
    <table>
      <tr className="message-data" key={this.timesRef.index}>
        <td> className="msg-user">{this.message.username}</td>
        <td> className="msg-content">{this.message.content}</td>
        <td> className="timestamp">{this.message.sentAt}</td>
      </tr>
    </table>
    )
  }
}



export default MessageList;
