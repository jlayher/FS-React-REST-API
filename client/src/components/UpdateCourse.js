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
            courseTitle: '',
            courseDescription: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        await axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                this.setState({
                    courseTitle: res.data.title,
                    courseDescription: res.data.description,
                    materialsNeeded: res.data.materialsNeeded,
                    estimatedTime: res.data.estimatedTime,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
     }

    handleSubmit = (event) => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const url = `http://localhost:5000/api/courses/${id}`;
        this.setState({errors: []});

        axios({
            method: 'put',
            url: url,
            auth: {
                username: Cookies.get('username'),
                password: Cookies.get('password')
            },
            data: {
                title: this.state.courseTitle,
                description: this.state.courseDescription,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded
            }
        })
        .then(res => {
            this.props.history.push(`/courses/${id}`)
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
        const { id } = this.props.match.params;
        const placeholderTitle = this.state.courseTitle;
        const placeholderDescription = this.state.courseDescription;
        return(
            <Consumer>
                {context => (
                    <main>
                        <div className="wrap">
                            <h2>Update Course</h2>
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
                            <form>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input 
                                            id="courseTitle" 
                                            name="courseTitle" 
                                            type="text" 
                                            placeholder={placeholderTitle} 
                                            value={this.state.courseTitle} 
                                            onChange={this.handleChange} />

                                        <label htmlFor="courseAuthor">Course Author</label>
                                        <input 
                                            id="courseAuthor" 
                                            name="courseAuthor" 
                                            type="text" 
                                            value={`${context.state.firstName} ${context.state.lastName}`} 
                                            onChange={this.handleChange} />

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea 
                                            id="courseDescription" 
                                            name="courseDescription" 
                                            placeholder= {placeholderDescription}
                                            value= {this.state.courseDescription}
                                            onChange={this.handleChange}>
                                        </textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input 
                                            id="estimatedTime" 
                                            name="estimatedTime" 
                                            type="text" 
                                            placeholder={this.state.estimatedTime} 
                                            value={this.state.estimatedTime} 
                                            onChange={this.handleChange}/>
                                            
                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            placeholder={this.state.materialsNeeded} 
                                            value={this.state.materialsNeeded} 
                                            onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                                <NavLink className="button" to={`/courses/${id}`} onClick={this.handleSubmit}>Update Course</NavLink>
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

