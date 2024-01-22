import './App.css'
import { useState, useEffect} from 'react'
import { Box, Button, Typography } from '@mui/material'
import storageService from './services/storage'
import loginService from './services/login'
import Login from './components/Login'
import ChatView from './components/ChatView'

const App = () => {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const login = async ({username, password}) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
    } catch(e) {
      console.log(e)
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
  }
  
  if (!user) {
    return (
      <Box>
        <Login login={login} users={users} setUsers={setUsers}/>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h3' sx={{ fontWeight: 'bold', textAlign: 'center' }}>Chat app</Typography>
      <Typography>{user.username} logged in</Typography>
      <Button onClick={logout}>Logout</Button>
      <ChatView user={user}/>
    </Box>
  )
}

export default App;
