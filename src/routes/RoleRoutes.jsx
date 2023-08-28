import { useSelector } from 'react-redux'
import ManagerRoutes from './ManagerRoutes'
import MentorRoutes from './MentorRoutes'
import Protected from './Protected'
import SeoAdminRoutes from './SeoAdminRoutes'
import StaffAdminRouts from './StaffAdminRouts'
import StudentRoutes from './StudentRoutes'

const RoleRoutes = () => {
  const { verificated, role } = useSelector((state) => state.login.login)
  if (!verificated) {
    return <Protected />
  }
  return (
    <>
      {role === 'SEO_ADMIN' ? <SeoAdminRoutes /> : ''}
      {role === 'STUDENT' ? <StudentRoutes /> : ''}
      {role === 'USER' ? <StudentRoutes /> : ''}
      {role === 'MANAGER' ? <ManagerRoutes /> : ''}
      {role === 'STAFF_ADMIN' ? <StaffAdminRouts /> : ''}
      {role === 'INSTRUCTOR' ? <MentorRoutes /> : ''}
      {role === 'MENTOR' ? <MentorRoutes /> : ''}
    </>
  )
}
export default RoleRoutes
