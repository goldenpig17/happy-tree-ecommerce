import * as React from 'react';
import { Box, Button, TextField, Grid, Link, Paper, Typography } from '@mui/material';
import Logo from './header/logo/Logo';


export default function SignUp() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [retypePassword, setRetypePassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      alert('Mật khẩu không đúng!');
      return;
    }

    // Logic gọi API
    fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Xử lý sau khi nhận phản hồi từ server
      })
      .catch(error => {
        console.error('Error:', error);
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
          Đăng Ký
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
                label="Mật khẩu"
                type="password"
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Nhập lại mật khẩu"
                type="password"
                variant="outlined"
                required
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={buttonStyle}>
                Đăng Ký
              </Button>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ ...customFontStyle, fontSize: '1rem' }}>
                Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>

  );
}
