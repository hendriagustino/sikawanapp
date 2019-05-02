import React, { Component } from 'react';
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';

import { editDoe } from './../../../../../store/actions/doeAction';

class index extends Component {

    state = {
        id: '',
        name: '',
        email: ''
    }

    componentDidMount() {
        this.setState({
            id: this.props.editData.id,
            name: this.props.editData.name,
            email: this.props.editData.email
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {

        return (
            <div>
                <MDBContainer>
                    <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                        <MDBModalHeader toggle={this.props.toggle}>EDIT DOE</MDBModalHeader>

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
                                    onChange={this.handleChange}
                                    value={this.state.name}
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
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />

                            </form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn size="sm" color="success" onClick={() => {

                                const data = {
                                    id: this.state.id,
                                    name: this.state.name,
                                    email: this.state.email
                                }

                                this.props.editDoe(this.props.token, data.id, data);
                                this.props.toggle();
                            }
                            }>SUBMIT</MDBBtn>

                            <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
                        </MDBModalFooter>

                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.loginReducer.token
    }
}

export default connect(
    mapStateToProps,
    { editDoe })(index);

    