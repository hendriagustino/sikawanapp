import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {checkLogin} from './../store/actions/loginAction';

import Sidebar from './sidebar';

import LandingPage from './pages/landing';
import Login from './pages/login';

import SchoolDashboard from './pages/school';
import CRUDClass from './pages/school/classData';
import CRUDStudent from './pages/school/studentData'; 
import CRUDSubjects from './pages/school/subjectsData'; 
import CRUDTeacher from './pages/school/teacherData'; 
import ComplainForSchool from './pages/school/complaintData';
import ShowSchedule from './pages/school/scheduleData'; 
import AddSchedule from './pages/school/scheduleData/addSchedulePage';

import TeacherDashboard from './pages/teacher';
import TeacherSchedule from './pages/teacher/scheduleData';
import StudentAttendance from './pages/teacher/StudentAttendaceInput';
import StudentAttendanceHistory from './pages/teacher/studentAttendanceData';
import StudentScore from './pages/teacher/studentScoreData';
import StudentScoreDetail from './pages/teacher/studentScoreData/studentScoreDetail';

import AdminDashboard from './pages/admin';
import CRUDAdmin from './pages/admin/adminData';
import CRUDSchool from './pages/admin/schoolData';
import CRUDDoe from './pages/admin/doeData';

import DoEDashboard from './pages/doe';
import ComplainForDoE from './pages/doe/complainData';

import history from './../history';

class App extends Component {

  componentDidMount() {
    this.props.checkLogin();
  }

  render() {

    const DefaultLayout = ({component: Component, ...rest}) => {
      return(
        <Route {...rest} render={props => (
          <div className="DefaultLayout">
            <Component {...props} />
          </div>
        )}/>
      )
    };

    const ProtectedLayout = ({component: Component, ...rest}) => {
      return(
        <Route {...rest} render={props => (
          <div className="ProtectedLayout">   
            {this.props.role==='school' && <Sidebar menuItem={['Subjects Data', 'Teachers Data', 'Classes Data', 'Students Data', 'Schedule Data', 'Complain Data']} /> }
            {this.props.role==='teacher' && <Sidebar menuItem={['Schedule Data', 'Student Score']} /> }    
            {this.props.role==='admin' && <Sidebar menuItem={['Admin Data', 'School Data','DoE Data']} /> }  
            {this.props.role==='doe' && <Sidebar menuItem={['Complain Data']} /> }            
            <div className="ProtectedLayout-content">
              <Component {...props} />
            </div>
          </div>  
        )}/>
      )
    };

    if(!this.props.isLogin) {
      return(
        <Router history={history}>
          <div className="App">
            <Switch>
              <DefaultLayout exact path="/" component={LandingPage}/>
              <DefaultLayout path="/login" component={Login}/>
              <Route render={() => <p>404</p>} />
            </Switch>
          </div>
        </Router>
      )
    }
    
    if(this.props.token && this.props.role==='school') {
      return(
        <Router history={history}>
          <div className="App">
            <Switch>
              <DefaultLayout path="/login" component={Login}/>
              <ProtectedLayout exact path="/" component={SchoolDashboard} />
              <ProtectedLayout path="/subjectsData" component={CRUDSubjects} />
              <ProtectedLayout path="/teachersData" component={CRUDTeacher} />
              <ProtectedLayout path="/classesData" component={CRUDClass} />
              <ProtectedLayout path="/studentsData"  component={CRUDStudent} />
              <ProtectedLayout path="/complainData" component={ComplainForSchool} />
              <ProtectedLayout path="/scheduleData"  component={ShowSchedule} />
              <ProtectedLayout path="/addScheduleData"  component={AddSchedule} />
              <Route render={() => <p>404</p>} />
            </Switch>
          </div>
        </Router>
      )
    }
    
    if(this.props.role==='teacher') {
      return(
        <Router history={history}>
          <div className="App">
            <Switch>
              <DefaultLayout path="/login" component={Login}/>
              <ProtectedLayout exact path="/"  component={TeacherDashboard} />
              <ProtectedLayout exact path="/scheduleData" component={TeacherSchedule} />
              <ProtectedLayout path="/scheduleHistory" component={StudentAttendanceHistory} />      
              <ProtectedLayout path="/studentAttendance/:schedule_id" component={StudentAttendance} />      
              <ProtectedLayout exact path="/studentScore"  component={StudentScore} /> 
              <ProtectedLayout path="/studentScore/:student_id"  component={StudentScoreDetail} /> 
              <Route render={() => <p>404</p>} />
            </Switch>
          </div>
        </Router>
      )
    }

    if(this.props.role==='admin') {
      return(
        <Router history={history}>
          <div className="App">
            <Switch>
              <ProtectedLayout exact path="/"  component={AdminDashboard} />
              <ProtectedLayout path="/adminData" component={CRUDAdmin} />
              <ProtectedLayout path="/schoolData" component={CRUDSchool} />
              <ProtectedLayout path="/doEData" component={CRUDDoe} />
              <Route render={() => <p>404</p>} />
            </Switch>
          </div>
        </Router>
      )
    }

    if(this.props.role==='doe') {
      return(
        <Router history={history}>
          <div className="App">
            <Switch>
              <ProtectedLayout exact path="/"  component={DoEDashboard} />
              <ProtectedLayout path="/complainData" component={ComplainForDoE} />
              <Route render={() => <p>404</p>} />
            </Switch>
          </div>
        </Router>
      )
    }

  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    role: store.loginReducer.role,
    isLogin: store.loginReducer.isLogin
  }
}

export default connect(mapStateToProps, {checkLogin})(App);

