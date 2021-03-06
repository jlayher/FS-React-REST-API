/* UserSignOut is a stateless component that does not render any
visual elements.  It simply signs out the authenticated user and redirects the 
client to the course list
*/
import React, { useContext, useEffect } from 'react';
import {UserContext} from './context';
import {Redirect} from 'react-router-dom'

//Sign out user and redirect to the home page
export default function UserSignOut() {
    const userContext = useContext(UserContext)
    useEffect(() => {
        userContext.signOut();
    })

    return(
        <Redirect to='/' />
    )
}
