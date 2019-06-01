import React, {Component} from 'react';



class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: ""
    }
    this.handleClick=this.handleClick.bind(this)
  }
handleClick() {
   this.setState ()
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );

}

handleChange (event) {
  this.setState({user: event.target.value});
}

  render () {
    return (
      <div>
      <input type="text" placeholder="Create a username..." name="user-name" value={this.state.user} onChange={this.handleChange}
      <button type="button" onClick={this.handleClick}>Sign-In</button>
      </div>
    )
  }
}

  export default User;
