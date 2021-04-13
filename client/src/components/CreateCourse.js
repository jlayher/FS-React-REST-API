/*
The Create Course Component renders the "Create Course" page.
It renders a form that allows a user to create a new course.
It also renders a "Create Course" button which sends a POST Request
to the API's "/api/courses" route.  
It also renders a "Cancel" button that returns the client to the course list.
*/

import React, {Component} from React;

export default class CreateCourse extends Component {
    render(){
        return(
            <main>
                <div class="wrap">
                    <h2>Create Course</h2>
                    <div class="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                    <form>
                        <div class="main--flex">
                            {/* <div>
                                <label for="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" value="">

                                <label for="courseAuthor">Course Author</label>
                                <input id="courseAuthor" name="courseAuthor" type="text" value="Joe Smith">

                                <label for="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription"></textarea>
                            </div> */}
                            {/* <div>
                                <label for="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" value="">

                                <label for="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                            </div> */}
                        </div>
                        <button class="button" type="submit">Create Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                    </form>
                </div>
            </main>
        );
    }
}
