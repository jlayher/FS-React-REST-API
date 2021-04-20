import React, { Component } from 'react';
//import Cookies from 'js-cookie';

const UserContext = React.createContext();

export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;


// export class Provider extends Component {
//     constructor(props) {
//         super(props);
//           this.state = {
//             authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
//             authenicatedPassword: Cookies.getJSON('authenticatedPassword') || null
//           };
//           this.signIn = this.signIn.bind(this);
//           this.signOut = this.signOut.bind(this);
//       }
    
    
//         signIn = async (emailAddress, password) => {
//         //get user and set the state to the current user
    
//         const url = 'http://localhost:5000/api/users';
//         //add authentication as a param in the axios get request
//         axios.get(url, {
//           auth: {
//             username: emailAddress,
//             password: password
//           }
//         })
//           .then(res => {
//             if (res.status === 200) {
//               this.setState({
//                 user: {
//                   id: res.data.id,
//                   firstName: res.data.firstName,
//                   lastName: res.data.lastName,
//                   emailAddress: res.data.emailAddress,
//                   password: res.data.password,
//                   isAuthenticated: true
//                 }
//               });
//               console.log(`${res.data.emailAddress} has been Authenticated`);
//             }
//           })
//           .catch(err => {
//             window.alert(`An Error Occured During Authentication: ${err}`);
//             console.log(`An Error Occured During Authentication: ${err}`)
//           })
//       }
    
//       signOut() {
//         this.setState({
//           user: {
//             id: '',
//             firstName: '',
//             lastName: '',
//             emailAddress: '',
//             password: '',
//             isAuthenticated: false
//         }})
//       }

//     render(){
//         const { authenticatedUser, authenicatedPassword} = this.state;
//         const value = {authenticatedUser, authenicatedPassword}
//         }
//     }
// }