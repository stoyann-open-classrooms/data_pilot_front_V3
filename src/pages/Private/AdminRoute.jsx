import { Outlet, Navigate } from 'react-router-dom'

function AdminRoute() {
  const userRole = JSON.parse(localStorage.getItem('userRole'))

  if (userRole !== 'admin') {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AdminRoute