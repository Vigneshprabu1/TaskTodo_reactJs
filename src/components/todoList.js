import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppBar} from "material-ui";
import Axios from "axios";
import './todoList.css';
import { API } from "../api";

export default class todoList extends Component {
  
  constructor(props) {
    super(props);
    this.getAllTodoList = this.getAllTodoList.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.state = {
      taskName: "",
      description: "",
      status: "",
      value:'',
      taskList:[]
    };
  }
  componentDidMount(){
    this.getAllTodoList();
    
  }

  editData = (a)=>{
    console.log('edit',a);
    this.props.history.push('/edit',{data:a});
  }
  getAllTodoList(){
    try {
      var payload = {
        taskName: this.state.taskName,
        description: this.state.description,
        status:'incomplete'
      };
      console.log("payload", payload);
  
      Axios.get(API + "/api/todoLists")
        .then(function (response) {
          console.log(response.data.length);
          if (response.status === 200) {
            this.setState({taskList:response.data});
            console.log("Login successfull",response.data);
          } else if (response.status === 204) {
            console.log("Username password do not match");
            alert("username password do not match");
          } else {
            console.log("Username does not exists");
            alert("Username does not exist");
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }catch(error1){
      console.log('err',error1);
      
    }
  }
  deleteData(a){
    try {
      var payload ={_id:a._id}
      Axios.put(API + "/api/todoLists",payload).then(function(response){
        if (response.status === 200) {
          this.getAllTodoList();
        }
      }.bind(this)).catch(function(error){
        console.log('err',error);
        
      })
    } catch (error) {
      console.log('err',error);
      
    }
  }
  addTask(){
    this.props.history.push('/add');
  }

  statusChange(event,a){
    console.log('save ',event.target.value,a);
    try {
      var payload ={_id:a._id,status:event.target.value}
      Axios.patch(API + "/api/todoLists/status",payload).then(
        function(response){
        if (response.status === 200) {
          this.getAllTodoList();
        }
      }.bind(this)).catch(function(error){
        console.log('err',error);
        
      })
    } catch (error) {
      console.log('err',error);
      
    }
  }
  renderTableData() {
    return this.state.taskList.map((a, index) => {
       const { taskName, description,status } = a;
       return (

         <tr key={taskName} style={status==='complete'? styles.completed: styles.incompleted}>
           <td>{taskName}</td>
           <td>{description}</td>
           <td>{status}</td>
           <td> 
             {
              <select  className="col-md-8 col-offset-4" value={a.status} onChange={(event)=>{
                this.statusChange(event,a)
              }}
              disabled={status ==='complete'}
              >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
             }
           </td>
           <td>
             {
               <button
                 className="edit"
                 disabled={status ==='complete'}
                 style={{ backgroundColor: "green" }}
                 onClick={() => this.editData(a)}
               >
                 Edit
               </button>
             }
           </td>
           <td>
             {
               <button
                 className="delete"
                //  disabled={status ==='complete'}
                 style={{ backgroundColor: "red" }}
                 onClick={() => this.deleteData(a)}
               >
                 Delete
               </button>
             }
           </td>
         </tr>
       );
    })
 }
  render() {
    return(
      <div>
         <MuiThemeProvider>
         <div className="container">
            <AppBar title="ToDoList" />
            <div style={{padding:10,paddingLeft:20,backgroundColor:'#FFF'}}>
              <h1>TaskList</h1>
              <div align="right">
              <button className="add" onClick={()=>this.addTask()}>Add Task </button>
              </div>
            <table>
            <thead>
              <tr>
              <th>TaskName</th>
              <th>Description</th>
              <th>Status</th>
              <th>ChangeStatus</th>
              <th>Edit</th>
              <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
            </table>
{/*
            <h1>data</h1>
            {this.state.taskList.map(a=>{
           return  <h1>{a.taskName}</h1>}
            )} */}
            </div>
            </div>
         </MuiThemeProvider>
        
      </div>
    );
  }
}
const styles = {
  completed: {
    backgroundColor: "#D3D3D3",
  },
  incompleted:{
    backgroundColor:'#fff',
 }
};