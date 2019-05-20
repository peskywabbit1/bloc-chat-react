import React, {Component} from 'react';
import ReactDOM from 'react-dom';



class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: " "

    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({message: this.state.message.concat(message)});
    });
  }

  render () {
    return (
      <div>
      Message List
      </div>
    )
  }
}





export default MessageList;
