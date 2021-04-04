

export const setUserToken = (token, user) => {
  if (typeof window !== "undefined") {

    console.log(token)
    console.log(user)
    localStorage.setItem('jwt', token)
    localStorage.setItem('user', JSON.stringify(user))
    console.log(localStorage)
  }
}

export const getToken = () => {
  return localStorage.getItem('jwt')

}
export const userLogout = () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('user')
}
