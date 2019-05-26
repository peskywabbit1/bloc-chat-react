import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rooms: [],
      newRoomName: " "
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
  }
//set up real-time event listeners for the database
componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }
//defined name and this method was created in Create Chat Rooms or List Messages
createRoom(newRoomName) {
  let newRoom = {
    name: newRoomName
  };
  this.roomsRef.push(newRoom)
  this.setState({newRoomName: ""});
}

/*filterActiveRoomId ()*/

handleChange(event) {
  this.setState({newRoomName: event.target.value}); //creating a room name
}

handleCreateRoomSubmit(event) {
  this.createRoom(this.state.newRoomName)  //creating a new room for the new room name when clicking on submit button
}




/*the active room should be highlighted and can be triggered by clicking on name of room in RoomList*/

render () {
  return (
    <div>
    <div>{this.props.activeRoom}</div>
      <section className="room-style">
        <ul>
          {
            this.state.rooms.map(room => (
                <li key={room.key} onClick={()=> { this.props.setActiveRoom(room.key)}}>
                  {room.name}
                </li>
                )
              )
            }
            </ul>
      </section>
      <form id="create-room">
        <input type="text" placeholder="Create a room..." name="newRoomName" value={this.state.newRoomName} onChange={this.handleChange} />
        <button type="button" onClick={this.handleCreateRoomSubmit}>Submit</button>
      </form>
    </div>
    )
  }
}
export default RoomList;
