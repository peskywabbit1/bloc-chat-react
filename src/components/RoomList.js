import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rooms: [],
      newRoomName: " "
    }
    /* Room reference and bind handlers*/
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
  }
/* Mount RoomList Component from firebase*/
componentDidMount() {
  this.roomsRef.on('child_added', snapshot => { /*snapshot is the data I made in firebase blocchat1222*/
    const room = snapshot.val(); // let "room" variable = the snapshot data from firebase
    room.key = snapshot.key;//let new "room" key = firebase snapshot data key.
    this.setState({ rooms: this.state.rooms.concat( room ) }) // update state of rooms array to concatenate (chain togther) all the room data recieved from firebase snapshot data
    });
  }



createRoom(newRoomName) { //
  let newRoom = {
    name: newRoomName
  };
  this.roomsRef.push(newRoom)
  this.setState({newRoomName: ""});
}
/*handle input change function. When user types in inputbox this is a listener for a change*/
handleChange(e) {
  this.setState({newRoomName: e.target.value}); //creating a room name.  target is the <input> element where user will change the text value
}

handleCreateRoomSubmit(event) { /*create a new room with a push function*/
  e.preventDefault();
  const room = { newRoomName }
  this.roomsRef.push(room); /*push into the room data a new room. */
  this.setState ({newRoomName: " "})
    //creating a new room for that goes with the new room name when clicking on submit button
}


/*the active room should be highlighted and can be triggered by clicking on name of room in RoomList*/

render () {
  /* RoomList page will go here*/
  return (
    <div className="roomlist">
    <h3>Chat Rooms<h3>
      <section className="room-style">
        <ul>
          {
            this.state.rooms.map(room => {
                <li key={room.key} onClick={(e)=> { this.props.setActiveRoom(room)}}>
                  {room.name}
                </li>
                  }
              )
            }
            </ul>
      </section>
      <form id="create-room" onSubmit={this.handleCreateRoomSubmit}>

        <input type="text" placeholder="Create a room..." name="New Room Name" value={this.state.newRoomName} onChange={this.handleChange} />
        <button type="button" onClick={this.props.activeRoom}>Submit</button>
      </form>
    </div>
  }
}

export default RoomList;
