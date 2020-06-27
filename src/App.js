import React from 'react';
// import logo from './logo.svg';
// import {Provider} from 'react-redux';
import './App.css';
import login from './components/login';
import todoList from './components/todoList';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import addtodoList from './components/addTodoList';
import edittodoList from './components/editTodoList';
import signUp from './components/signUp';

function App() {
  return (
    <div>
      <BrowserRouter >
        <Switch>
            <Route exact path='/' component={login}></Route>
            <Route exact path='/signup' component={signUp}></Route>
            <Route exact path='/todoList' component={todoList}></Route>
            <Route exact path='/add' component={addtodoList}></Route>
            <Route exact path='/edit' component={edittodoList}></Route>
        </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
