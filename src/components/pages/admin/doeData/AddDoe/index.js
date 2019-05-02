import React, { Component } from 'react'
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {connect} from 'react-redux';

import {getDoe, addDoe, deleteDoe} from './../../../../../store/actions/doeAction';

class index extends Component {

    state = {
        name: '',
        email: ''
    }

    addDoe = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        const data = {
            name: this.state.name,
            email: this.state.email
        }
        this.props.addDoe(this.props.token, data);
        this.props.toggle();
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                        <MDBModalHeader toggle={this.props.toggle}>Add New DOE</MDBModalHeader>

                        <MDBModalBody>
                            <form>
                               
                                <label htmlFor="name" className="grey-text mt-2">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    pattern="^(?!\s*$).+"
                                    required
                                    className="form-control"
                                    onChange={this.addDoe}
                                />

                                <label htmlFor="email" className="grey-text mt-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    required
                                    className="form-control"
                                    onChange={this.addDoe}
                                />

                            </form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn size="sm" color="success" onClick={this.handleClick}>SUBMIT</MDBBtn>
                            <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
                        </MDBModalFooter>

                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.loginReducer.token,
        doe: store.doeReducer.doe,
        isFetching: store.doeReducer.isFetching
    }
}

export default connect (
    mapStateToProps,
    {getDoe, addDoe, deleteDoe})(index);