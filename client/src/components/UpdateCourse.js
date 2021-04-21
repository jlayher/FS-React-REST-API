/*
The UpdateCourse Component renders the "Update Course" page.
It renders a form that allows a user to update on of their existing courses.
It also renders an "Update Course" button that sends a PUT request to 
"/api/courses/:id"
It also renders a "Cancel" button that returns the client to the "Course Detail" page
*/

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from './context';

//import js-cookies
import Cookies from 'js-cookie';

class UpdateCourse extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
//component did mount func
    //axios request for the course's data

    async componentDidMount() {
        const { id } = this.props.match.params;
        await axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    materialsNeeded: res.data.materialsNeeded,
                    estimatedTime: res.data.estimatedTime,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


//handleChange function
    //bind to "this" in constructor
    //take in event object as parameter
    //update state

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
     }


//SOMETHING IS WRONG WITH THE AXIOS PUT AND PUSH REQUESTS
//this one is not executing the update to the database
//nor is it properly redirecting to the course description after submission
    handleSubmit = (event) => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const url = `http://localhost:5000/api/courses/${id}`;
        axios({
            method: 'put',
            url: url,
            auth: {
                username: Cookies.get('username'),
                password: Cookies.get('password')
            },
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded
            }
        })
        .then(res => {
            this.props.history.push(`/courses/${id}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    render(){
        const { id } = this.props.match.params;
        return(
            <Consumer>
                {context => (
                    <main>
                        <div className="wrap">
                            <h2>Update Course</h2>
                            <form>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input id="courseTitle" name="courseTitle" type="text" value={this.state.title} onChange={this.handleChange} />

                                        <label htmlFor="courseAuthor">Course Author</label>
                                        <input id="courseAuthor" name="courseAuthor" type="text" value={`${context.state.firstName} ${context.state.lastName}`} onChange={this.handleChange} />

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="courseDescription" value={this.state.description} onChange={this.handleChange}></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text" placeholder={this.state.estimatedTime} value={this.state.estimatedTime} onChange={this.handleChange}/>

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded" placeholder={this.state.materialsNeeded} value={this.state.materialsNeeded} onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                                <NavLink className="button" to={`/courses/${id}`} onClick={this.handleSubmit}>Update Course</NavLink>
                                {/* Cancel Button links to the Course Description Page for Current Course */}
                                <NavLink to={`/courses/${id}`} className="button button-secondary">Cancel</NavLink>
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
        {context => <UpdateCourse {...props} context={context} />}
    </Consumer>
)

