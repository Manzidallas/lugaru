import React from 'react';

const Form = ({ onSubmit, children, className }) => {
    return (
        <form
            onSubmit={onSubmit}
            className={`space-y-4 ${className}`}
        >
            {children}
        </form>
    );
};

export default Form;