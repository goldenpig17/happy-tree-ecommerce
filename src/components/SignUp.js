import * as React from 'react';
import { Button, TextField, Grid, Link, Paper, Typography } from '@mui/material';

export default function SignUp() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [retypePassword, setRetypePassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      alert('Passwords do not match!');
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

  return (
    <Paper style={{ padding: 20, maxWidth: 300, margin: "0 auto" }}>
      <Typography variant="h5" style={{ marginBottom: 20 }}>Sign Up</Typography>
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
            <TextField 
              fullWidth
              label="Retype Password"
              type="password"
              variant="outlined"
              required
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Forgot your password?
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
