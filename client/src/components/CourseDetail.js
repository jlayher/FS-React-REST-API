/*
The CourseDetail Component renders the "Course Detail" page for 
its associated course when the route is "/api/courses/:id".
The component also renders a "Delete Course" button which sends
a DELETE request to the server at "/api/courses/:id".
This component also renders a button that navigates the client to the 
"Update Course" page.
*/

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/context';

//import Markdown for Exceeds-Excpectations Requirements 
import ReactMarkdown from 'react-markdown';

//import js-cookies
import Cookies from 'js-cookie';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state ={
            course: [],
            user: []
        };
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                this.setState({ course: res.data, user: res.data.User});
            })
            //Error Redirect Issues
            .catch(error =>{
                if(error.status === 404) {
                    this.props.history.push('/notfound');
                } else if(error.status === 500) {
                    this.props.history.push('/error')
                }
            });
    }

    //Create a handleDeleteCourse function to Delete a Course
    handleDeleteCourse = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const url = `http://localhost:5000/api/courses/${id}`;
        console.log(id);
        if ( window.confirm(`Are you sure you want to DELETE ${this.state.course.title}?`)) {
            axios.delete(url, {
                auth: {
                    username: Cookies.get('username'),
                    password: Cookies.get('password')
                },
            })
            .then(res => {
                //redirect back to the Courses page
                this.props.history.push('/')
                console.log(`${this.props.value.state.emailAddress} ${this.props.value.state.password}`)
            })
            //Error Redirect Issues (just add 500 error)
            .catch((err) => {
                window.alert("You do not have permission to delete this course");
                console.log(err);
            })
        }
    }

    render() {
        return (
            <Consumer>
                {context => (
                    <main>
                        <div className="actions--bar">
                            <div className="wrap">
                            {context.state.isAuthenticated && this.state.course.userId === context.state.id ? (
                                <span>
                                    <NavLink className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</NavLink>
                                    <NavLink className="button" to={`/courses/${this.state.course.id}`} onClick={this.handleDeleteCourse}>Delete Course</NavLink>
                                </span>
                            ) : (
                                null
                            )}
                                <NavLink className="button button-secondary" to='/'>Return to List</NavLink>
                            </div>
                        </div>
                        
                        <div className="wrap">
                            <h2>Course Detail</h2>
                            <form>
                                <div className="main--flex">
                                    <div>
                                        <h3 className="course--detail--title">Course</h3>
                                        <h4 className="course--name">{this.state.course.title}</h4>
                                        <p>By {this.state.user.firstName} {this.state.user.lastName}</p>

                                        <ReactMarkdown source={this.state.course.description} />
                                    </div>
                                    <div>
                                        <h3 className="course--detail--title">Estimated Time</h3>
                                        <p>{this.state.course.estimatedTime}</p>

                                        <h3 className="course--detail--title">Materials Needed</h3>
                                        {/* commented out the <ul> because the <ReactMardown> Component wasn't rendering correctly*/}
                                        {/* <ul className="course--detail--list"> */}
                                        <ReactMarkdown source={this.state.course.materialsNeeded} />
                                        {/* </ul> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                )}
            </Consumer>
        );
    }
}

//Double Check This Code.  Intended use is using props outside the render method, 

//Check to see that this is working correctly after authentication is set up.  
export default props => (
    <Consumer>
        {context => <CourseDetail {...props} value={context} />}
    </Consumer>
)