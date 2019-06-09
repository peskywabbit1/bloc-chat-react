import React, {Component} from 'react';




class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      deleteRoomName: ""
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createRoomSubmit = this.createRoomSubmit.bind(this);
    this.deleteRoom =this.deleteRoom.bind(this);


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

createRoomSubmit(event) {
  this.createRoom(this.state.newRoomName);
  this.setState({newRoomName: ""});
}

handleChange(event) {
  this.setState({newRoomName: event.target.value});
}

deleteRoom(id) {
  this.roomsRef.child(id).removeValue();
}
/*
deleteRoom (deleteRoomName) {
  let deleteRoom = {
    name: deleteRoomName
  };
}

deleteRoomSubmit(event) {
this.deleteRoom(this.state.deleteRoomName);
this.setState({deleteRoomName: ""});
}

handleChangeDelete (roomId) {
this.setState(prevState => {
  const updatedRooms = prevState.rooms.map(room => {
    if (this.state.rooms.id === roomId ) {
      roomId = "";
    }
    return room.key;
  })
  return {
    rooms : updatedRooms
   }
 })
}
*/
//handleChangeDelete

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
        <input type="text"
          placeholder="Create a room..."
          name="room-name"
          value={this.state.newRoomName}
          onChange={this.handleChange}
          />
        <button type="button"
          onClick={this.createRoomSubmit}>
          Submit
        </button>
        <br/>
        <input type="text"
        placeholder = "Delete a room..."
        name="room-name"
        value=
        onChangeDelete={this.deleteRoom}
        />
        <button type="button"
        onClickDelete={this.deleteRoom}>
        Delete
        </button>

      </form>
    </div>
    )
  }
}

export default RoomList;
