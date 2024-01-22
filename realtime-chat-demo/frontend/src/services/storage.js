const KEY = 'chatUser'

const saveUser = (user) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  // eslint-disable-next-line no-undef
  return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem(KEY)
  }

export default {
  saveUser, loadUser, removeUser
}