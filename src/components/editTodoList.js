import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { TextField, RaisedButton, AppBar } from "material-ui";
import Axios from "axios";
import { API } from "../api";
export default class edittodoList extends Component {
  documentData;
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getEditData = this.getEditData.bind(this);
    this.state = {
      taskName: "",
      description: "",
      status: "",
    };
  }
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      // console.log("this.documentData", this.documentData);
      this.getEditData();
    } else {
      this.props.history.push("/");
    }
  }
  getEditData() {
    this.setState({
      taskName: this.props.location.state.data.taskName,
      description: this.props.location.state.data.description,
      status: this.props.location.state.data.status,
    });
  }
  handleClick(event) {
    try {
      var payload = {
        _id: this.props.location.state.data._id,
        taskName: this.state.taskName,
        description: this.state.description,
        loginId: this.documentData._id,
        status: this.state.status,
      };
      // console.log("payload", payload);

      Axios.patch(API + "/api/todoLists", payload)
        .then(
          function (response) {
            console.log(response);
            if (response.status === 200) {
              this.props.history.push("/todoList");
              console.log("Update successfull");
            } else if (response.status === 204) {
              console.log("");
            } else {
              console.log("");
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    } catch {}
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Edit Todo" />
          <div className="container">
            <div
              style={{
                padding: 100,
                paddingLeft: 500,
                backgroundColor: "#FFF",
              }}
            >
              <h2>Edit Task</h2>
              <TextField
                hintText="Enter your TaskName"
                floatingLabelText="TaskName"
                value={this.state.taskName}
                onChange={(event, newValue) =>
                  this.setState({ taskName: newValue })
                }
              />
              <br />
              <TextField
                hintText="Enter your Description"
                floatingLabelText="Description"
                value={this.state.description}
                onChange={(event, newValue) =>
                  this.setState({ description: newValue })
                }
              />
              <br />
              <RaisedButton
                label="Update"
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
