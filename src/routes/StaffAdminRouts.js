import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Autorization from '../components/auth/Autorization'
import StaffAdminAcessToDeleteGroup from '../components/staffAdmin/StaffAdminAcessToDeleteGroup'
import StaffAdminCard from '../components/staffAdmin/StaffAdminCard'
import StaffAdminHomeWorkStudentId from '../components/staffAdmin/StaffAdminHomeWorkStudentId'
import StaffAdminInstructorMentor from '../components/staffAdmin/StaffAdminInstructorMentor'
import StaffAdminInstructorMentorProfile from '../components/staffAdmin/StaffAdminInstructorMentorProfile'
import StaffAdminLesson from '../components/staffAdmin/StaffAdminLesson'
import StaffAdminNotification from '../components/staffAdmin/StaffAdminNotification'
import StaffAdminProfile from '../components/staffAdmin/StaffAdminProfile'
import StaffAdminStudents from '../components/staffAdmin/StaffAdminStudents'
import StaffAdminLayouts from '../layouts/StaffAdminLayouts'
import Error from './Error'
import LoadingSpinner from './LoadingSpinner'

const StaffAdminRouts = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<StaffAdminLayouts />}>
          <Route path='/' element={<StaffAdminCard />} />
          <Route path='/inctructor' element={<StaffAdminInstructorMentor />} />
          <Route
            path='/inctructorOrMentor/:instructorMentorProfileID'
            element={<StaffAdminInstructorMentorProfile />}
          />
          <Route
            path='/notifications'
            element={<StaffAdminAcessToDeleteGroup />}
          />
          <Route
            path='/studentGroups/:student'
            element={<StaffAdminStudents />}
          />
          <Route path='/lessons/:lessonsId' element={<StaffAdminLesson />} />
          <Route
            path='/lessons/submission/:submissionId/assigment/:assigmentId'
            element={<StaffAdminHomeWorkStudentId />}
          />
          <Route path='/profileStaffAdmin' element={<StaffAdminProfile />} />
          <Route path='login' element={<Autorization variant='Login' />} />
          <Route path='/notification' element={<StaffAdminNotification />} />
          <Route path='*' element={<Error variant='page' />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </Suspense>
  )
}
export default StaffAdminRouts
