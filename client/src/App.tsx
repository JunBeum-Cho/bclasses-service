import './App.css';
import Table from './Table'
import React from 'react';
import bclasses from './bclasses';
import { addItem, login, loginCheck } from "./api"
import { Route, Redirect } from "react-router-dom"
import Axios from 'axios'
import cookies from "js-cookie"
import store from "./redux/store"

class App extends React.Component {
  componentDidMount() {
  //   Axios.get('/login/auth')
  //   .then( response => { console.log("123123", response); } ) // SUCCESS
  //   .catch( error => { console.log("123123", error); } ); // ERROR

    // Axios.post("/login", {id: "junbeumc", password: "junbeumcpass"})
    // .then( response => { console.log("123123", response); } ) // SUCCESS
    // .catch( error => { console.log("123123", error); } ); // ERROR
    if(!cookies.get("authtoken")) {
      store.dispatch({type: "LOGOUT"})
    }
  }

  render() {
    let state = store.getState()
    return (
      ! state.login.auth
      ? <Redirect to="/login"/>
      : <Route>
          <div id="cluster">
              <h1>hi{state.login.auth}</h1>
              <button onClick={this.handleLogout}>logout button</button>
              {this.renderbclasses()}
              {this.renderaddlist()}
          </div>
        </Route>
    )
  }

  renderbclasses() {
    let state = store.getState()
    const bclasses = state?.list.bclasses
    return bclasses.map(
      (bclass, index) => (
      <Table 
        key={index}
        tableName={bclass.name} 
        tableData={bclass.data}
        handleAddData={this.handleAddData} 
        handleRemoveData={this.handleRemoveData}
        handleTableName={this.handleTableName}/>)
    )
  }

  handleAddData = (tableName, courseid) => {
    let state = store.getState()
    const bclasses = state?.list.bclasses
    const example = {
      course_validation: true,
      is_offered: true,
      courseid: 3,
      availability: "Nope",
      course_title: "Example 100",
      course_subtitle: "Example Class",
      currently_enrolled: `${courseid}`,
      max_enrolled: `${courseid}`,
      currently_waitlisted: `${courseid}`,
      max_waitlisted: `${courseid}`,
      total_class_grade: `${courseid}`,
      recent_section_grade: `${courseid}`,
      recent_section_period: "spring 2020"
    }

    const updated_bclasses = bclasses.map((bclass) => {
      if(bclass.name === tableName){
        return {name: bclass.name, data: [...bclass.data].concat(example)}
      } else{
        return bclass
      }
    })
    store.dispatch({type: "ADD_ITEM", })
    this.setState({...this.state, bclasses: updated_bclasses})
  }

  renderaddlist() {
    return (
        <button className="addlist_btn" onClick={this.addlist_onClick} >+ Add List</button>
    )
  }

  handleLogout = () => {
    cookies.remove("authtoken")
    this.setState({auth: false})
  }

  handleRemoveData = (tableName, courseid) => {
    let state = store.getState()
    const bclasses = state?.list.bclasses

    const updated_bclasses = bclasses.map((bclass) => {
      if(bclass.name === tableName){
        return {name: bclass.name, data: [...bclass.data].filter( course => 
          course.courseid !== courseid
        )}
      } else{
        return bclass
      }
    })
    this.setState({...this.state, bclasses: updated_bclasses})
  }

  addlist_onClick = () => {
    let state = store.getState()
    const number = state?.list.number
    const bclasses = state?.list.bclasses

    this.setState({number: number+1, bclasses: [...bclasses.concat({name: `New list_${number}`, data: []})]})
  }

  handleTableName = (tableName, newtableName) => {
    let state = store.getState()
    const newbclasses = state.list.bclasses.map((bclass) => {
      if(bclass.name === tableName) {
        return {name: newtableName, data: [...bclass.data]}
      } else {
        return bclass
      }
    })

    this.setState({...this.state, bclasses: newbclasses})
  }
}

export default App



