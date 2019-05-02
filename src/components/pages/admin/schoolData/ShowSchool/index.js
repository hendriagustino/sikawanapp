import React, { Component } from 'react'
import { MDBDataTable, MDBBtn, MDBRow , MDBIcon } from 'mdbreact';

export default class index extends Component {

    render() {
        return (
            <div>
                <MDBDataTable
                    small
                    striped
                    bordered
                    hover
                    data={this.props.data}
                />
            </div>
        )
    }
}

