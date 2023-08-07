import { Outlet, Navigate } from 'react-router-dom'

function SuperAdminRoute() {
  const userRole = JSON.parse(localStorage.getItem('userRole'))

  if (userRole !== 'superAdmin') {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default SuperAdminRoute
