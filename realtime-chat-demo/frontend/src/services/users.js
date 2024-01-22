import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAllUsers = async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }
  
  const create = async (object) => {
    const request = await axios.post(baseUrl, object)
    return request.data
  }
  
  export default { getAllUsers, create }



