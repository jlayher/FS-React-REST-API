/*
The UserSignUp Component renders the "Sign Up" page by
rendering a form, allowing the user to create a new account.
The component also renders a "Sign Up" button that creates a POST Request
to the API's "/api/users" route, and signs in the user.
The component also renders a "Cancel" button that returns the client to the course list
*/

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './context';
import axios from 'axios';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/users';
        this.setState({errors: []});
        
        if (this.state.password === this.state.confirmPassword) {
            axios({
                method: 'post',
                url: url,
                data:
                {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    emailAddress: this.state.emailAddress,
                    password: this.state.password,
                }
            })
            .then(res => {
                this.props.value.signIn(this.state.emailAddress, this.state.password);
                this.props.history.push('/');
            })
            .catch((err) => {
                if(err.response.status === 400) {
                    this.setState({
                        errors: err.response.data.errors
                    })
                } 
            })
        } else {
            window.alert("Your Password does not match your Confirmed Password");
        }
    }

    render(){
        return(
            <Consumer>
                {context => (
                    <main>
                        <div className="form--centered">
                            <h2>Sign Up</h2>
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
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
                                <label htmlFor="emailAddress">Email Address</label>
                                <input id="emailAddress" name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.handleChange}/>
                                <label htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
                                {/* Change from NavLink to buttons */}
                                <NavLink className="button" to="/" onClick={this.handleSubmit}>Sign Up</NavLink>
                                <NavLink className="button button-secondary" to="/">Cancel</NavLink>
                            </form>
                            <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
                        </div>
                    </main>
                )}
            </Consumer>
            
        );
    }
}

export default props => (
    <Consumer>
        {context => <UserSignUp {...props} value={context} />}
    </Consumer>
)