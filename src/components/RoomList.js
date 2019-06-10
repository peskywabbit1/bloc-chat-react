import React, {Component} from 'react';




class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      deleteRoom: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createRoomSubmit = this.createRoomSubmit.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }
  componentDidMount () {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({rooms: this.state.rooms.concat(room )});
        console.log(snapshot);
        console.log(snapshot.key);
      });
    this.roomsRef.on('child_removed', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({rooms: this.state.rooms.filter(room => room.key !== snapshot.key)})
      });
    }
createRoom(newRoomName) {
  let newRoom = {
    name: newRoomName
  };
  this.roomsRef.push(newRoom);
}
createRoomSubmit(event) {
  this.createRoom(this.state.newRoomName);
  this.setState({newRoomName: ""});
}
handleChange(event) {
  this.setState({newRoomName: event.target.value});
}
deleteRoom(roomkey) {
  const room = this.props.firebase.database().ref('rooms/' + roomkey);
  room.remove();
  console.log(roomkey);
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
                <button className="deleteRoom"
                  onClick= { (e) =>
                  {this.deleteRoom(room.key)} }>Delete
                </button>
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
      </form>
    </div>
    )
  }
}

export default RoomList;
