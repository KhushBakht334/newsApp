import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <Router>
      <NavBar/>
      <Routes>
        <Route path='/general' element={<News key="general" pageSize={5} country="us" category="general"/>}></Route>
        <Route path='/entertainment' element={<News key ="entertainment" pageSize={5} country="us" category="entertainment"/>}></Route>
        <Route path='/business' element={<News key ="business" pageSize={5} country="us" category="business"/>}></Route>
        <Route path='/health' element={<News key ="health" pageSize={5} country="us" category="health"/>}></Route>
      </Routes>
      </Router>
      
      </>
    )
  }
}
