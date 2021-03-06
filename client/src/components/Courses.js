/* 
The Course Component renders the "Courses" page (a list of courses)
by retrieving the list of courses from "/api/courses" 
Each course links to its associated "Course Detail" page, as well as 
a Link to the "Create Course" page
*/
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        };
    }
    
    // fetch the courses data and set courses state
    async componentDidMount() {
        await axios.get('http://localhost:5000/api/courses')
            .then(res => {
                this.setState({
                    courses: res.data
                });
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    render() {
        return(
            <main>
                <div className="wrap main--grid">
                    {/* map over courses and render links to course descriptions */}
                    {this.state.courses.map( (course) => 
                        <div key={course.id}>
                            <NavLink className="course--module course--link" to={`/courses/${course.id}`}>
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </NavLink>
                        </div>
                    )}

                    {/* Create A New Course Link */}
                    <NavLink className="course--module course--add--module" to="/courses/create">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </NavLink>
                </div>
            </main>
        );
    }

}


