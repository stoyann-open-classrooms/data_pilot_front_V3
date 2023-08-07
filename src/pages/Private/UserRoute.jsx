import { Outlet, Navigate } from 'react-router-dom'

function UserRoute() {
  const userRole = JSON.parse(localStorage.getItem('userRole'))

  if (userRole !== 'user') {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default UserRoute
