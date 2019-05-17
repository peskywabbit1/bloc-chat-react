import React, {Component} from 'react';



class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    rooms: []
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
    }
//set up real-time event listeners for the database
componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

}

export default RoomList;
