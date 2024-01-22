import axios from 'axios'
import storageService from './storage'

const baseUrl = 'http://localhost:3001/api/messages'

const getAll= async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }
  
  const create = async (object) => {
    const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
    const request = await axios.post(baseUrl, object, { headers })
    return request.data
  }
  
  export default { getAll, create }