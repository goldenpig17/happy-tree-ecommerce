import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Breadcrumbs,} from '@mui/material';

const BreadCrumb = ({ breadcrumbs }) => {
    const breadcrumbStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: "18px",
    };

    return (
        <Paper sx={{ padding: 2, backgroundColor: '#fef7d0', boxShadow: 3, marginBottom: 3, maxWidth: '40%', margin: 'auto' }}>
            <Breadcrumbs aria-label="breadcrumb">
                <div className="breadcrumb" style={breadcrumbStyle}>
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index}>
                            {index !== 0 && " > "}
                            <Link to={crumb.url} style={breadcrumbStyle}>{crumb.name}</Link>
                        </span>
                    ))}
                </div>
            </Breadcrumbs>
        </Paper>
    );
};

export default BreadCrumb;
