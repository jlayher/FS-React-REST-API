import React, {Component} from 'react';
import axios from 'axios';

//imports from React Router DOM
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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

  state = {
    data: []
  }

  // componentDidMount() {
  //   fetch('http://localhost:5000/api/courses')
  //   .then(res => res.json())
  //   .then((resData) => {
  //     this.setState({
  //       data: resData
  //     });
  //   })
  //   .catch(console.log)
  // }

  // componentDidMount() {
  //   axios.get('http://localhost:5000/api/courses')
  //     .then((resData) => {
  //       this.setState({
  //         data: resData.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  render(){
    return (
      <Provider>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" render={() => <Courses />} />
              <Route exact path="/courses/create" render={() => <CreateCourse />} />
              <Route exact path="/courses/:id/update" render={() => <UpdateCourse />} />
              <Route exact path="/courses/:id" render={() => <CourseDetail />} />
              <Route exact path="/signin" render={() => <UserSignIn />} />
              <Route exact path="/signup" render={() => <UserSignUp />} />
              <Route exact path="/signout" render={() => <UserSignOut />} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }

  //test for rendering a list of course data to the page
  // render(){
  //   return (
  //     <div>
  //       {this.state.data.map(course => 
  //         <div>
  //           <ul>
  //             <li>{course.id}</li>
  //             <li>{course.title}</li>
  //             <li>{course.description}</li>
  //             <li>{course.userId}</li>
  //           </ul>
            
  //         </div>
  //       )}
  //     </div>
  //   );
  // }
}

export default App;