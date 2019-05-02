export const getjwt = () => {
  return localStorage.getItem('token')
}

export const getRole = () => {
  return localStorage.getItem('role');
}