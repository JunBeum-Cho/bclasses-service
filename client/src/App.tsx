import './App.css';
import Table from './Table'
import React from 'react';
import bclasses from './bclasses';
import { addItem, login, loginCheck } from "./api"
import { Route, Redirect } from "react-router-dom"
import Axios from 'axios'
import cookies from "js-cookie"
import { TramRounded } from '@material-ui/icons';

class App extends React.Component {
  state = {
    auth: true,
    number: 0,
    bclasses: [{
      name: "Example List",
      data: [{
        course_validation: true,
        is_offered: true,
        courseid: 1,
        course_title: "Example Class",
        course_subtitle: "Introduction to Example",
        currently_enrolled: "100",
        max_enrolled: "150",
        currently_waitlisted: "0",
        max_waitlisted: " 50",
        total_class_grade: "3.6",
        recent_section_grade: "3.5",
        recent_section_period: "spring 2020"
      }]
    }]
  }

  componentDidMount() {
  //   Axios.get('/login/auth')
  //   .then( response => { console.log("123123", response); } ) // SUCCESS
  //   .catch( error => { console.log("123123", error); } ); // ERROR

    // Axios.post("/login", {id: "junbeumc", password: "junbeumcpass"})
    // .then( response => { console.log("123123", response); } ) // SUCCESS
    // .catch( error => { console.log("123123", error); } ); // ERROR
    if(!cookies.get("authtoken")) {
      this.setState({auth:false})
    }
    console.log("123123",cookies.get("authtoken"))
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    return (
      !this.state.auth
      ? <Redirect to="/login"/>
      : <Route>
          <div id="cluster">
              <h1>hi{this.state.auth}</h1>
              <button onClick={this.handleLogout}>logout button</button>
              {this.renderbclasses()}
              {this.renderaddlist()}
          </div>
        </Route>
    )
  }

  renderbclasses() {
    const { bclasses } = this.state
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
    const {bclasses} = this.state
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
    const {bclasses} = this.state

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
    const { number, bclasses } = this.state
    this.setState({number: number+1, bclasses: [...bclasses.concat({name: `New list_${number}`, data: []})]})
  }

  handleTableName = (tableName, newtableName) => {
    const newbclasses = this.state.bclasses.map((bclass) => {
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



