import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <h1 className='text-5xl text-center mt-20'>404 Error! Page Not Found</h1>
                <p className='text-center mt-4 text-lg'>The page you are looking for does not exist.</p>
                <Link to="/" className='btn btn-primary block mx-auto mt-6'>Go Back Home</Link>
        </div>
    );
};

export default Error;