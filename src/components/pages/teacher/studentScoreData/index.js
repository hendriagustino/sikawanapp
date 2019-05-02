import React, { Component } from 'react';
import {MDBRow, MDBCol, MDBDataTable, MDBBtn} from 'mdbreact';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getStudentScore } from './../../../../store/actions/scoreAction';
import Loader from './../../../loader';

class index extends Component {
  state = {
    currentClass: ''
  }

  componentDidMount() {
    this.props.getStudentScore(this.props.token);
  } 

  handleChange = e => {
    this.setState({
      currentClass: e.target.value
    })
  }

  render() {

    const classList = this.props.classrooms.map(classroom => {
      return (
        <option key={classroom._id} value={classroom._id}>{classroom.fullname}</option>
      )
    })

    const rows = []
    
    this.props.classrooms
      .filter(classroom => classroom._id === this.state.currentClass)
      .forEach(item => {
        rows.push(...item.students);
      })

    const dataTable =
    {
      columns: [
        {label: 'NISN', field: 'nisn'},
        {label: 'Name', field: 'name'},
        {label: 'Action', field: 'action'}
      ],
      rows : rows.map(student => {
        return {
          nisn: student.nisn,
          name: student.fullname,
          action: 
            <Link to={`/studentScore/${student._id}`}>
              <MDBBtn size="sm" color="primary">Scores</MDBBtn>
            </Link>
        }
      })
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />
        <h1 className="font-weight-bold">Student Score</h1>
        <MDBRow className="my-4">
          <MDBCol size="3">
            <select className="browser-default custom-select" onChange={this.handleChange}>   
              <option>Choose a Class</option>  
              { classList }
            </select>
          </MDBCol>
        </MDBRow>

        <MDBDataTable
          bordered
          striped
          hover
          small
          data={dataTable}
        />       
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isFetching: store.scoreReducer.isFetching,
    classrooms: store.scoreReducer.classrooms
  }
}

export default connect(mapStateToProps, {getStudentScore})(index);

