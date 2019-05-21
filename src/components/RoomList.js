import React, {Component} from 'react';






class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: "",
      showFormNewRoom: false,
      newRoomName: ""
      //setActiveRoom: this.props.setActiveRoom
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
    //this.handleSetRoom = this.handleSetRoom.bind(this);
    this.createRoomSubmit = this.createRoomSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
  }
//set up real-time event listeners for the database
componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

//createRoom(newRoomName) {
//  let newRoom = {
//    name: newRoomName
//  };
  // Save to database
//  this.roomsRef.push(newRoom)
//  this.setState({newRoomName: ""});
//}

handleChange(event) {
  this.setState({name: event.target.value});
}

createRoomSubmit(newRoomName) {
  this.roomsRef.push({});
  this.setState({name: ""});
  this.setState ({ showFormNewRoom: false });
}

formRoomOpen (){
  this.setState({showFormNewRoom: true});
}

formRoomClose(){
  this.setState({showFormNewRoom: false});
}

showForm() {
  if(this.state.showFormNewRoom) {
    return (
      <form id="newRoomForm">
        <h3>Create a new Room</h3>
      <input type="text" id="newRoomName" name="newRoomName" placeholder="Enter room name..." onChange={this.handleChange} value={this.state.name}></input>
      </form>
    )
  }
}

//active room should be triggered by clicking on the name of the room in the  RoomList component.
//handleSetRoom(e){
  //let room = {name: e.target.innerText, id: e.target.id};

//  this.props.setActiveRoom(room);
//}

render () {
  return (
    <div>
      <section>
        <ul>
          {
            this.state.rooms.map(room => (
              <li key={room.key} id={room.key} name={room.name} onClick={this.createRoomSubmit}>
                {room.name}
              </li>
              )
            )
          }
        </ul>
      </section>
      <form id="create-room">
        <input type="text" placeholder="Create a room..." name="room-name" value={this.state.newRoomName} onChange={this.handleChange} />
        <button type="button" onClick={this.createRoomSubmit}>Submit</button>
      </form>
    </div>
    )
  }
}


export default RoomList;
