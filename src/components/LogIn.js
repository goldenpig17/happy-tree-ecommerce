import * as React from 'react';
import { Button, TextField, Grid, Link, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
                    throw new Error('Username or Password Incorrect');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Lưu token và refreshToken vào sessionStorage
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('refreshToken', data.refreshToken);
                // Chuyển hướng người dùng sau khi đăng nhập thành công
                navigate("/");
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.message === 'User not found') {
                    alert('User not found. Please try again.');
                }
                else {
                    alert('Password is Incorrect');
                }
            });
    };

    return (
        <Paper style={{ padding: 20, maxWidth: 300, margin: "0 auto" }}>
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
                            Log In
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            Don't have an account? <Link href="/signup">Sign Up</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
