import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductFooter() {
    return (
        <div className="col-md-3" style={{ color: 'black' }}> {/* Assuming the footer background is dark */}
            <h5 style={{ borderBottom: '1px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
                Dịch Vụ
            </h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>Sơ Đồ Trang</li>
                <li style={{ marginBottom: '10px' }}>Luật</li>
                <li style={{ marginBottom: '10px' }}>Tìm Kiếm</li>
                <li style={{ marginBottom: '10px' }}>Luật</li>
                <li>Liên Hệ</li>
            </ul>
        </div>
    );
}
