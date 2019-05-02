import React, { Component } from 'react'
import { MDBDataTable, MDBBtn, MDBIcon } from 'mdbreact';

export default class index extends Component {

  state = {

    
  };

  render() {
    return (
      <div>
        <MDBDataTable
          small
          striped
          bordered
          hover
          data={this.state.data}
        />
      </div>
    )
  }
}

