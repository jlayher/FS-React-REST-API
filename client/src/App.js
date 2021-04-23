import React, {Component} from 'react';
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
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

//import styles
import './styles/global.css';

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

  componentDidMount() {
    let username = Cookies.get("username");
    let password = Cookies.get("password");
    if (!this.state.isAuthenticated && username && password) {
      this.signIn(username, password);
    }
  }

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

          //succeeded
          //this.props.history
          //history.push() last page
        }
      })
      .catch(err => {
        window.alert(`An Error Occured During Authentication: ${err}`);
        console.log(`An Error Occured During Authentication: ${err}`)
      })
  }



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
              <Route exact path="/">
                {<Redirect to="/courses"/>}
              </Route>
              <Route exact path="/courses" render={() => <Courses />} />
              <PrivateRoute exact path="/courses/create" component={ CreateCourse } user={this.state.user}/>
              <PrivateRoute exact path="/courses/:id/update" component={ UpdateCourse } user={this.state.user}/>
              <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props}/>} />
              <Route exact path="/signin" render={() => <UserSignIn />} />
              <Route exact path="/signup" render={(props) => <UserSignUp {...props}/>} />
              <Route exact path="/signout" render={() => <UserSignOut />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
