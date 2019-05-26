import React, {Component} from 'react';



class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
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

createRoom(newRoomName) {
  let newRoom = {
    name: newRoomName
  };
  // Save to database
  this.roomsRef.push(newRoom)
}

handleChange(event) {
  this.setState({newRoomName: event.target.value});
}

handleCreateRoomSubmit(event) {
  this.createRoom(this.state.newRoomName)
  this.setState({newRoomName: ""})
}

render () {
  return (
    <div>
      <section>
        <ul>
          {
            this.state.rooms.map(room => (
                <li key={room.key}
                onClick={ () => this.props.setActiveRoom(room.key) }>
                {room.name}
                </li>
                )
              )
            }
            </ul>
      </section>
      <form id="create-room">
        <input type="text" placeholder="Create a room..." name="room-name" value={this.state.newRoomName} onChange={this.handleChange} />
        <button type="button" onClick={this.handleCreateRoomSubmit}>Submit</button>
      </form>
    </div>
    )
  }
}

export default RoomList;
