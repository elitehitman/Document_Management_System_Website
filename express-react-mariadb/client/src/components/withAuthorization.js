// withAuthorization.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthorization = (WrappedComponent, allowedUserTypes) => {
    const WithAuthorization = (props) => {
        const navigate = useNavigate();
        const userType = localStorage.getItem('userType');

        useEffect(() => {
            if (!allowedUserTypes.includes(userType)) {
                navigate('/login'); // Redirect to login page if user type is not allowed
            }
        }, [userType, allowedUserTypes, navigate]);

        return <WrappedComponent {...props} />;
    };

    return WithAuthorization;
};

export default withAuthorization;
