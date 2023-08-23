import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ManagerCreatedGroup from '../components/manager/ManagerCreatedGroup'
import ManagerGroup from '../components/manager/ManagerGroup'
import ManagerInstructorMentor from '../components/manager/ManagerInstructorMentor'
import ManagerInstructorMentorProfile from '../components/manager/ManagerInstructorMentorProfile'
import ManagerNotifications from '../components/manager/ManagerNotifications'
import ManagerProfile from '../components/manager/ManagerProfile'
import ManagerSeoAdmin from '../components/manager/ManagerSeoAdmin'
import ManagerStaffAdmin from '../components/manager/ManagerStaffAdmin'
import ManagerStudentGroup from '../components/manager/ManagerStudentGroup'
import ManagerStudentProfile from '../components/manager/ManagerStudentProfile'
import ManagerStudnets from '../components/manager/ManagerStudnets'
import MainManagerLayout from '../layouts/manager/MainManagerLayout'
import Error from './Error'
import LoadingSpinner from './LoadingSpinner'

const ManagerRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<MainManagerLayout />}>
          <Route path='/' element={<ManagerGroup />} />
          <Route path='/students' element={<ManagerStudnets />} />
          <Route path='/:id' element={<ManagerStudentGroup />} />
          <Route
            path='/students/:studentId'
            element={<ManagerStudentProfile />}
          />
          <Route
            path='/instructorOrMentor'
            element={<ManagerInstructorMentor />}
          />
          <Route
            path='/instructorOrMentor/:insturctorMentorProfileId'
            element={<ManagerInstructorMentorProfile />}
          />
          <Route path='/createdGroup' element={<ManagerCreatedGroup />} />
          <Route path='/notification' element={<ManagerNotifications />} />
          <Route path='/staffAdmin' element={<ManagerStaffAdmin />} />
          <Route path='/seoAdmin' element={<ManagerSeoAdmin />} />
          <Route path='/profile' element={<ManagerProfile />} />
          <Route path='*' element={<Error variant='page' />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </Suspense>
  )
}
export default ManagerRoutes
