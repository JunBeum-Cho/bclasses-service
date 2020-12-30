import { Button, TextField } from "@material-ui/core";
import React from "react";
import Axios from 'axios'
import { Route, Redirect } from "react-router-dom"
import cookies from "js-cookie"
import store from "./redux/store"

export class Login extends React.Component {
  state = {
    id: "",
    password: "",
  };

  render() {
    return cookies.get("authtoken")
    ? 
      <Redirect to={"/"}/>
    :(
      <div style={{marginLeft: "60px", marginTop: "60px"}}>
        <TextField
          placeholder = "ID"
          required = {true}
          onChange={(e) => {
            this.setState({ id: e.target.value });
          }}
        ></TextField>
        <TextField
          style={{marginLeft: "30px"}} 
          placeholder = "Password"
          required = {true}
          onChange={(e) => {
            this.setState({ password: e.target.value });
          }}
        ></TextField>
        <Button variant="contained" style={{marginLeft: "30px"}} onClick={this.handleOnclick}>Submit</Button> 
      </div>
    );
  }

  handleOnclick = () => {
    console.log(1, store.getState())
    console.log(2, store.getState().list)
    console.log(3, store.getState().login)

    Axios.post("/login", {id: this.state.id, password: this.state.password})
    .then( response => { 
      console.log("로그인 status: ", response); 
      if(response.status === 201) {
        this.setState({auth: true})
      }
    }) // SUCCESS
    .catch( error => { console.log("123123", error); } ); // ERROR
  }
}


export default Login