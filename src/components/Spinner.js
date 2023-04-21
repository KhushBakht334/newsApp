import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <div>
      
        <div className='text-center'>
        <img src={loading} alt="g"></img>
        </div>
      </div>
    )
  }
}

export default Spinner
