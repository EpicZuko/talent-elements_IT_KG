import { useSelector } from 'react-redux'
import ManagerRoutes from './ManagerRoutes'
import Protected from './Protected'
import SeoAdminRoutes from './SeoAdminRoutes'
import StaffAdminRouts from './StaffAdminRouts'
import StudentRoutes from './StudentRoutes'

const RoleRoutes = () => {
  const { jwt, role } = useSelector((state) => state.login.login)
  if (!jwt) {
    return <Protected />
  }
  return (
    <>
      {role === 'SEO_ADMIN' ? <SeoAdminRoutes /> : ''}
      {role === 'STUDENT' ? <StudentRoutes /> : ''}
      {role === 'USER' ? <StudentRoutes /> : ''}
      {role === 'MANAGER' ? <ManagerRoutes /> : ''}
      {role === 'STAFF_ADMIN' ? <StaffAdminRouts /> : ''}
    </>
  )
}
export default RoleRoutes
