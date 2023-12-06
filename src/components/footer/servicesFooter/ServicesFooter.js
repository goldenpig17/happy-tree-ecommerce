import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductFooter() {
    return (
        <div className="col-md-3" style={{ color: 'black' }}> {/* Assuming the footer background is dark */}
            <h5 style={{ borderBottom: '1px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
                SERVICES
            </h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>Sitemap</li>
                <li style={{ marginBottom: '10px' }}>Privacy Policy</li>
                <li style={{ marginBottom: '10px' }}>Advanced Search</li>
                <li style={{ marginBottom: '10px' }}>Terms & Condition</li>
                <li>Contact Us</li>
            </ul>
        </div>
    );
}
