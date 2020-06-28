import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Axios from "axios";
import {API} from "../api";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: "",
      password: "",
      id:''
    };
  }
  handleClick = (event)=>{
    var payload = {
      userName: this.state.username,
      password: this.state.password,
    };
    // console.log("payload", payload);

    Axios.post(API + "/api/logins", payload)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          this.setState({id: response.data.user._id});
          // localStorage.setItem(response.data.user);
          localStorage.setItem('user',JSON.stringify(response.data.user));
          localStorage.setItem('token',JSON.stringify(response.data.token));
          // console.log('response', response.data.user._id);
          
         this.props.history.push('/todoList');
          console.log("Login successfull");
        } else if (response.status === 204) {
          console.log("Username password do not match");
        } else {
          console.log("Username does not exists");
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
  signUp(){
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className="container">
            <AppBar title="Login" />
            <div style={{padding:100,paddingLeft:500,backgroundColor:'#FFF'}}>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Login"
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)}
            />
             <RaisedButton
              label="SignUp"
              primary={true}
              style={style}
              onClick={() => this.signUp()}
            />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
