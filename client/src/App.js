import React, {Component} from 'react';
import axios from 'axios';

//imports from React Router DOM
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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


    signIn = async (emailAddress, password) => {
    //get user and set the state to the current user

    const url = 'http://localhost:5000/api/users';
    //add authentication as a param in the axios get request
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
              <Route exact path="/" render={() => <Courses />} />
              <Route exact path="/courses/create" render={() => <CreateCourse />} />
              <Route exact path="/courses/:id/update" render={() => <UpdateCourse />} />
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




// class App extends Component {
//   constructor(props) {
//     super(props);
//       this.state = {
//         user: {
//           id: '',
//           firstName: '',
//           lastName: '',
//           emailAddress: '',
//           password: '',
//           isAuthenticated: false
//         }
//       };
//       this.signIn = this.signIn.bind(this);
//       this.signOut = this.signOut.bind(this);
//   }


//     signIn = async (emailAddress, password) => {
//     //get user and set the state to the current user

//     const url = 'http://localhost:5000/api/users';
//     //add authentication as a param in the axios get request
//     axios.get(url, {
//       auth: {
//         username: emailAddress,
//         password: password
//       }
//     })
//       .then(res => {
//         if (res.status === 200) {
//           this.setState({
//             user: {
//               id: res.data.id,
//               firstName: res.data.firstName,
//               lastName: res.data.lastName,
//               emailAddress: res.data.emailAddress,
//               password: res.data.password,
//               isAuthenticated: true
//             }
//           });
//           console.log(`${res.data.emailAddress} has been Authenticated`);
//         }
//       })
//       .catch(err => {
//         window.alert(`An Error Occured During Authentication: ${err}`);
//         console.log(`An Error Occured During Authentication: ${err}`)
//       })
//   }

//   signOut() {
//     this.setState({
//       user: {
//         id: '',
//         firstName: '',
//         lastName: '',
//         emailAddress: '',
//         password: '',
//         isAuthenticated: false
//     }})
//   }

//   render(){
//     return (
//       <Provider value={{
//         state: this.state.user,
//         signIn: this.signIn,
//         signOut: this.signOut
//       }}>
//         <Router>
//           <div>
//             <Header />
//             <Switch>
//               <Route exact path="/" render={() => <Courses />} />
//               <Route exact path="/courses/create" render={() => <CreateCourse />} />
//               <Route exact path="/courses/:id/update" render={() => <UpdateCourse />} />
//               <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props}/>} />
//               <Route exact path="/signin" render={() => <UserSignIn />} />
//               <Route exact path="/signup" render={(props) => <UserSignUp {...props}/>} />
//               <Route exact path="/signout" render={() => <UserSignOut />} />
//             </Switch>
//           </div>
//         </Router>
//       </Provider>
//     );
//   }
// }

// export default App;