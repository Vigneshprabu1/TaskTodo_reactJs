import React, { Component } from 'react'
import Axios from 'axios';
import { API } from '../api';
import { RaisedButton, TextField, AppBar } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

export default class signUp extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            password:''
        }
    }
    saveNewUser(){
        try {
            var payload = {
                userName: this.state.username,
                password: this.state.password,
                status:'active'
              };
        Axios.post(API+'/api/logins/save',payload)
        .then(function(response){
            if (response.status === 200) {
                this.props.history.push('/');
                 console.log("SignUp successfull");
               } else if (response.status === 204) {
                 console.log("");
               } else {
                 console.log("");
               }
             }.bind(this))
             .catch(function (error) {
               console.log(error);
             });
        } catch (error) {
            console.log('err',error);
            
        }
    }
    render() {
        return (
            <div>
            <MuiThemeProvider>
              <div className="container">
                <AppBar title="SignUp" />
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
                  label="Signup"
                  primary={true}
                  style={style}
                  onClick={() => this.saveNewUser()}
                />
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        )
    }
}
const style = {
    margin: 15,
  };