/*
The Create Course Component renders the "Create Course" page.
It renders a form that allows a user to create a new course.
It also renders a "Create Course" button which sends a POST Request
to the API's "/api/courses" route.  
It also renders a "Cancel" button that returns the client to the course list.
*/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './context';
import axios from 'axios';

//import js-cookies
import Cookies from 'js-cookie';


class CreateCourse extends Component {
    constructor(props) {
        super(props)
        this.state ={
            courseTitle: '',
            courseDescription: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
        //console.log(this.context.props.userId);
        //console.log(this.context.props.userId);
     }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/courses';
        this.setState({errors: []});

        axios({
            method: 'post',
            url: url,
            auth: {
                username: Cookies.get('username'),
                password: Cookies.get('password')
            },
            data: {
                title: this.state.courseTitle,
                description: this.state.courseDescription,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
                userId: this.props.context.state.id,
            }
        })
        .then(res => {
            this.props.history.push(`/`);
        })
        .catch((err) => {
            if(err.response.status === 400) {
                this.setState({
                    errors: err.response.data.errors
                })
            } 
        })
    }
    
    render(){
        return(
            <Consumer>
                {context => (
                    <main>
                        <div className="wrap">
                            <h2>Create Course</h2>
                            {/* Validation Errors */}
                            {this.state.errors.length > 0 && (
                                <div className="validation--errors">
                                    <h3>Validation Errors</h3>
                                    <ul>
                                        {this.state.errors.map((error, i) =>(
                                            <li key={i}>{error}</li>
                                        ))}
                                    </ul>
                                </div> 
                            )}
                            <form onSubmit={this.handleSubmit}>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input 
                                            id="courseTitle" 
                                            name="courseTitle" 
                                            type="text" 
                                            placeholder="Title..." 
                                            value={this.state.courseTitle} 
                                            onChange={this.handleChange}/>

                                        <label htmlFor="courseAuthor">Course Author</label>
                                        <input 
                                            id="courseAuthor" 
                                            name="courseAuthor" 
                                            type="text" 
                                            value={`${context.state.firstName} ${context.state.lastName}`} 
                                            onChange={this.handleChange}/>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea 
                                            id="courseDescription" 
                                            name="courseDescription" 
                                            placeholder="Description..." 
                                            value={this.state.courseDescription} 
                                            onChange={this.handleChange}>
                                        </textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input 
                                            id="estimatedTime" 
                                            name="estimatedTime" 
                                            type="text" 
                                            placeholder="Estimated Time..." 
                                            value={this.state.estimatedTime} 
                                            onChange={this.handleChange}/>

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            placeholder="Materials Needed..." 
                                            value={this.state.materialsNeeded} 
                                            onChange={this.handleChange}>
                                        </textarea>
                                    </div>
                                </div>
                                {/* Change from NavLink to buttons */}
                                <button className="button" type="submit">Create Course</button>
                                <NavLink to="/"><button className="button button-secondary">Cancel</button></NavLink>
                                
                                {/* <NavLink className="button" to="/" onClick={this.handleSubmit}>Create Course</NavLink> */}
                                {/* <NavLink className="button button-secondary" to="/">Cancel</NavLink> */}
                            </form>
                        </div>
                    </main>
                )}
            </Consumer>
        );
    }
}

export default props => (
    <Consumer>
        {context => <CreateCourse {...props} context={context} />}
    </Consumer>
)