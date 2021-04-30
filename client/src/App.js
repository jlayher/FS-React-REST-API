import React, {Component} from 'react';

//import Axios
import axios from 'axios';

//imports from React Router DOM
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//import js-cookies
import Cookies from 'js-cookie';

//import context
import { Provider } from './components/context';


//import components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourseWithContext from './components/CreateCourse';
import UpdateCourseWithContext from './components/UpdateCourse';
import CourseDetailWithContext from './components/CourseDetail';
import UserSignInWithContext from './components/UserSignIn';
import UserSignUpWithContext from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

//import styles
import './styles/global.css';


//Create Container App Component.  Provides the user Context
class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        user: {
          id: '',
          firstName: '',
          lastName: '',
          emailAddress: '',
          password: '',
          isAuthenticated: false
        }
      };
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
  }

  //on mount set cookies and persist authentication
  componentDidMount() {
    let username = Cookies.get("username");
    let password = Cookies.get("password");
    if (!this.state.isAuthenticated && username && password) {
      this.signIn(username, password);
    }
  }

    //Sign in Component shared through Context to Child Components
    signIn = async (emailAddress, password) => {
    const url = 'http://localhost:5000/api/users';
    axios.get(url, {
      auth: {
        username: emailAddress,
        password: password
      },
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            user: {
              id: res.data.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              emailAddress: res.data.emailAddress,
              password: res.data.password,
              isAuthenticated: true
            }
          });
          Cookies.set('username', emailAddress, {expires: 1})
          Cookies.set('password', password, {expires: 1})
          console.log(`${res.data.emailAddress} has been Authenticated`);
        }
      })
      .catch(err => {
        window.alert(`An Error Occured During Authentication: ${err}`);
        console.log(`An Error Occured During Authentication: ${err}`)
      })
  }

  //signOut function passed to the UserSignOut Component
  signOut() {
    this.setState({
      user: {
        id: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        isAuthenticated: false
    }})
    Cookies.remove('username')
    Cookies.remove('password')
  }

  //Provider and Routes
  render(){
    return (
      <Provider value={{
        state: this.state.user,
        signIn: this.signIn,
        signOut: this.signOut
      }}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" render={() => <Courses />} />
              <PrivateRoute exact path="/courses/create" component={ CreateCourseWithContext } user={this.state.user}/>
              <PrivateRoute exact path="/courses/:id/update" component={ UpdateCourseWithContext } user={this.state.user}/>
              <Route exact path="/courses/:id" render={(props) => <CourseDetailWithContext {...props}/>} />
              <Route exact path="/signin" render={(props) => <UserSignInWithContext {...props}/>} />
              <Route exact path="/signup" render={(props) => <UserSignUpWithContext {...props}/>} />
              <Route exact path="/signout" render={() => <UserSignOut />} />
              <Route exact path="/forbidden" render={()=> <Forbidden />} />
              <Route exact path="/error" render={() => <UnhandledError />} />
              <Route exact path="/notfound" component={NotFound}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
