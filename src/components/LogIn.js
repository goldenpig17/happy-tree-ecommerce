import * as React from 'react';
import { Button, TextField, Grid, Link, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from './breadcrumbs/BreadCrumb';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();



    const handleSubmit = (event) => {
        event.preventDefault();

        // Gọi API đăng nhập
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Tên đăng nhập hoặc Mật khẩu không đúng');
                }
                return response.json();
            })
            .then(data => {
                // Lưu token và refreshToken vào sessionStorage
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('refreshToken', data.refreshToken);

                // Đặt trạng thái đăng nhập trong sessionStorage
                sessionStorage.setItem('isLoggedIn', true);
                // Chuyển hướng người dùng sau khi đăng nhập thành công
                navigate("/");
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.message === 'Không tìm thấy người dùng') {
                    alert('Không tìm thấy người dùng. Xin hãy thử lại.');
                }
                else {
                    alert('Mật khẩu không đúng');
                }
            });
    };

    //BreadCrumb
    const breadcrumbs = [
        {
            name: "Trang chủ",
            url: "/"
        }
    ];

    return (
        <Paper style={{ padding: 20, maxWidth: 300, margin: "0 auto" }}>
            <BreadCrumb breadcrumbs={breadcrumbs} />
            <Typography variant="h5" style={{ marginBottom: 20 }}>Log In</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Đăng nhập
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            Don't have an account? <Link href="/signup">Đăng ký</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
