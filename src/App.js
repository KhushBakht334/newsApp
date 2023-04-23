import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <>
      <Router>
      <NavBar/>
      <LoadingBar
      height={4}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
      <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={5} country="in" category="general"/>}></Route>
        <Route path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={5} country="in" category="general"/>}></Route>
        <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key ="entertainment" pageSize={5} country="in" category="entertainment"/>}></Route>
        <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key ="business" pageSize={5} country="in" category="business"/>}></Route>
        <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key ="health" pageSize={5} country="in" category="health"/>}></Route>
      </Routes>
      </Router>
      
      </>
    )
  }
}
