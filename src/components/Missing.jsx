import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
    return (
        <main>
            <h2>Page Not Found</h2>
            <p>Well, that is very disappointing.</p>
            <Link to="/">Please visit our Homepage</Link>
        </main>
    );
};

export default Missing;
