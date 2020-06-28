import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { TextField, RaisedButton, AppBar } from "material-ui";
import Axios from "axios";
import { API } from "../api";
export default class addtodoList extends Component {
  documentData;
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      taskName: "",
      description: "",
      status: "",
    };
  }
  componentDidMount(){
    this.documentData = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      // console.log("this.documentData", this.documentData);
      // this.getEditData();
    } else {
      this.props.history.push("/");
    }
  }
  handleClick(event) {
    try{
      var payload = {
        taskName: this.state.taskName,
        description: this.state.description,
        loginId:this.documentData._id,
        status:'incomplete'
      };
      // console.log("payload", payload);
  
      Axios.post(API + "/api/todoLists", payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            this.props.history.push('/todoList');
            console.log("save successfull");
          } else if (response.status === 204) {
            console.log("");
          } else {
            console.log("");
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }catch(error){
      console.log('login',error);
      
    }
  }
  render() {
    return(
      <div>
         <MuiThemeProvider>
         <AppBar title="Add ToDo" />
         <div className="container">
            <div style={{padding:100,paddingLeft:500,backgroundColor:'#FFF'}}>
            <h2>ADD Task</h2>
            <TextField
              hintText="Enter your TaskName"
              floatingLabelText="TaskName"
              onChange={(event, newValue) =>
                this.setState({ taskName: newValue })
              }
            />
            <br />
            <TextField
              hintText="Enter your Description"
              floatingLabelText="Description"
              onChange={(event, newValue) =>
                this.setState({ description: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Add"
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)}
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
