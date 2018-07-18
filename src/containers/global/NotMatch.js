import React, { Component, PropTypes } from 'react'
import './NotMatch.scss'

class NotMatch extends Component {

  render () {

    return (
      <div style={{padding:8}} className='notMatch-container'>
        <h1 style={{fontSize:'32px',marginBottom:'22px',fontWeight:'bold',color:'#fff'}}>404 Not Found</h1>
        <p style={{margin:'16px 0',color:'#fff',fontSize:'16px'}}>The requested URL was not found on this server.</p>
        <hr/>
        <p style={{color:'#fff',fontSize:'16px'}}>Powered by Loncus server</p>
      </div>
    )
  }
}



export default NotMatch
