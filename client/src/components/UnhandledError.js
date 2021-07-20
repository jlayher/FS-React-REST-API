/*
The Unhandled Error Component renders the "Unhandled Error" page, for when 
server side errors occur.
*/
import React from 'react';

const UnhandledError = () => {
    return(
        <div className='wrap'>
            <h1>Error</h1>
            <p>Sorry!  We just encountered an unexpected error!</p>
        </div>
    )
}

export default UnhandledError;