import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import usersService from '../services/users'

const RegisterForm = ({users, setUsers}) => {

    const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const addUser = async () => {
        const addedUser = await usersService.create({username, password})
        setUsers(users.concat(addedUser))
        setPassword('')
        setUsername('')
        console.log('register')
    }

  return (
    <Box>
        <TextField
          id="register-username"
          label="Username"
          required
          fullWidth
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          margin="normal"
        />
        <TextField
          id="register-password"
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
        />
        <Button onClick={addUser}>Register</Button>
    </Box>
  )
}

export default RegisterForm