import * as React from 'react';
import { Button, TextField, Grid, Link, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './header/logo/Logo';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/actions';

export default function Login() {
    const dispatch = useDispatch();
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

                // Dispatch hành động đăng nhập tới Redux store
                dispatch(loginUser({ token: data.token, refreshToken: data.refreshToken }));


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

    const customFontStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
    };

    const buttonStyle = {
        backgroundColor: '#07361f',
        '&:hover': {
            backgroundColor: '#6c8e5d',
        },
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: 'large',
        color: '#fef7d0',
        fontweight: 'bold',
        cursor: 'pointer',
        margin: '20px 0',
    };

    return (
        <Box display="flex" justifyContent="flex-end" m={2}>
            <Paper style={{ padding: 20, maxWidth: 300, margin: "0 auto", backgroundColor: '#fef7d0' }}>
                <Logo />
                <Typography
                    variant="h5"
                    style={{ marginBottom: 20 }}
                    sx={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.6rem' }}
                >
                    Đăng nhập
                </Typography>
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
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={buttonStyle}>
                                Đăng nhập
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" sx={{ ...customFontStyle, fontSize: '1rem' }}>
                                Chưa có tài khoản? <Link href="/signup">Đăng ký</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>

    );
}
