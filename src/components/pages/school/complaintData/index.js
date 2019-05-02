import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon} from "mdbreact";
import {connect} from 'react-redux';
import {getComplaintsBySchool, addSchoolResponse, deleteSchoolResponse} from './../../../../store/actions/complaintAction';
import {alert} from './../../../modal/Alert';
import {confirm} from './../../../modal/Confirm';
import Loader from './../../../loader';

class index extends Component {

  state = {
    isShow: false,
    imgSrc: '',
    response: '',
    isResponse: false
  }

  handleImgClick = src => {
    this.setState({
      isShow: true,
      imgSrc: src
    })
  }

  handleResponse = e => {
    this.setState({
      isResponse: true
    })
  }

  handleCancel = e => {
    this.setState({
      isResponse: false
    })
  }

  handleChange = e => {
    this.setState({
      response: e.target.value
    })
  }

  handleSend = id => {
    this.state.response ?
      this.props.addSchoolResponse(this.props.token, id, this.state.response) :
      alert("response can't empty!")
  }

  handleDeleteResponse = id => {
    confirm('Are you sure want to delete the response?').then(
      () => {
        this.props.deleteSchoolResponse(this.props.token, id)
      },
      () => {}
    )
  }

  componentDidMount(){
    this.props.getComplaintsBySchool(this.props.token);
  }

  render() {

    const complaintList = 
    this.props.complaints
    .filter(item => item.approvedDoe === true)
    .map(complaint => {
      return (
        <MDBCard key={complaint._id} className="py-0" style={{ width: "100%", marginBottom: '1em'}}>
          <MDBCardBody>
            <MDBCardText style={{
              fontSize: '1.2em'
            }}>
              From: <span style={{fontWeight:'bold'}}>{complaint.user ? complaint.user.parent : ''}</span> <br/>
              {/* Parent of : <span style={{fontWeight:'bold'}}>{complaint.user ? complaint.user.fullname : ''}</span> <br/>
              Class: <span style={{fontWeight:'bold'}}> {complaint.user ? complaint.user.kelas.fullname : ''} </span> <br/> */}
            </MDBCardText>
            <hr/>
            <MDBCardTitle>
              {complaint ? complaint.complaint : ''}
            </MDBCardTitle>
            
            <div>
              {
                complaint.image &&
                complaint.image
                .map((item,i) => {
                  return(
                    <div 
                      key={i} 
                      style={{
                        display: 'inline-block',
                        backgroundImage: `url(${item})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '100px', 
                        height: '100px', 
                        cursor: 'pointer', 
                        borderRadius: '5px', 
                        margin: '0 5px',
                        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.1)'}}
                      onClick={() => this.handleImgClick(item)}/>
                  )
                })
              }
            </div>

            {
              !complaint.responseSchool ?
                !this.state.isResponse ?
                  <MDBBtn 
                  color="primary"
                  className="float-md-right"
                  onClick={this.handleResponse}>
                  Give a Response</MDBBtn> 
                  : 
                  <form>
                    <div className="form-group mt-3">
                      <label htmlFor="response">
                        Reply :
                      </label>
                      <textarea
                      className="form-control"
                      id="response"
                      rows="5"
                      onChange={this.handleChange}
                      />
                    </div>
                    <MDBBtn color="danger" size="sm" className="float-md-right" onClick={this.handleCancel}>Cancel</MDBBtn>
                    <MDBBtn color="primary" size="sm" className="float-md-right" onClick={() => this.handleSend(complaint._id)}>Send</MDBBtn>
                  </form>
                :
                <MDBCard className="p-3 mt-3 bg-primary text-white">
                  <MDBBtn 
                    size="sm" 
                    color="white" 
                    style={{
                    position: 'absolute',
                    top: '1em',
                    right: '1em',
                    boxShadow: 'none',
                    }}
                    onClick={() => this.handleDeleteResponse(complaint._id)}
                  ><MDBIcon icon="times" /></MDBBtn>
                  <span className="font-weight-bold mb-2">Reply : </span>
                  <p>{complaint.responseSchool}</p>
                </MDBCard>
            }
          </MDBCardBody>
        </MDBCard>
      )
    })

    return (
      <div>
        {
          this.state.isShow &&
            <div className="lightbox">
              <MDBIcon icon="times" className="lightbox-close" onClick={() => this.setState({isShow: false})}/>
              <img src={this.state.imgSrc} alt="lightbox"/>
            </div>
        }
        <Loader show={this.props.isFetching} />
        <h1 style={{
          fontWeight: "bold",
          marginBottom: '1rem'
        }}>List of Complaints</h1>
        {complaintList}
      </div>
    )
  }
}

const MapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    complaints: store.complaintReducer.complaints,
    isFetching: store.complaintReducer.isFetching
  }
}

export default connect(MapStateToProps, {getComplaintsBySchool, addSchoolResponse, deleteSchoolResponse})(index);
