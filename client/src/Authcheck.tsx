import React from "react";
import Axios from 'axios'
import { Route, Redirect } from "react-router-dom"
import cookies from "js-cookie"

export class Authcheck extends React.Component {
  state = {
    auth: true
  }

  componentDidMount() {
    Axios.get("/login/authcheck").catch(err => {
      if (err.response.status > 300) {
        cookies.remove("authtoken")
        this.setState({auth: false})
      }
    })
  }
  render() {
    return (
      this.state.auth 
      ? <h1>hi there</h1>
      : <Redirect to="/login"/>
    )
  }

}


export default Authcheck