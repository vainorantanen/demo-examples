import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import RegisterForm from './RegisterForm'

const Login = ({login, users, setUsers}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box>
      <Typography>Login</Typography>
      <TextField
          id="login-username"
          label="Username"
          required
          fullWidth
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          margin="normal"
        />
        <TextField
          id="login-password"
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
        />
        <Button onClick={() => login({username, password})}>Login</Button>

      <Typography>Register</Typography>
      <RegisterForm users={users} setUsers={setUsers}/>
    </Box>
  )
}

export default Login