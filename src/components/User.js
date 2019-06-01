import React, {Component} from 'react';



class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleClick2=this.handleClick2.bind(this)

  }
handleClick() {
   this.setState ()
   const provider = new this.props.firebase.auth.GoogleAuthProvider();
   this.props.firebase.auth().signInWithPopup( provider );
}

handleChange (event) {
  this.setState({user: event.target.value});
}

handleClick2() {
  this.setState ()
  this.props.firebase.auth().signOut();
}

  render () {
    return (
      <div>
      <input type="text" placeholder="Create a username..." name="user-name" value={this.state.user} onChange={this.handleChange} />
      <button type="button" onClick={this.handleClick}>Sign-In</button>
      <button type="button" onClick={this.handleClick2}>Sign-Out</button>
      </div>
    )
  }
}


  export default User;
