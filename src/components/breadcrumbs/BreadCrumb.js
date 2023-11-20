import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ breadcrumbs }) => {
    return (
        <div className="breadcrumb">
            {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                    {index !== 0 && " > "} {/* Add a separator except for the first item */}
                    <Link to={crumb.url}>{crumb.name}</Link>
                </span>
            ))}
        </div>
    );
};

export default BreadCrumb;
