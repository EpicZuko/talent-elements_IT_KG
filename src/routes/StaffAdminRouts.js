import { Routes, Route } from 'react-router-dom'
import Autorization from '../components/auth/Autorization'
import StaffAdminCard from '../components/staffAdmin/StaffAdminCard'
import StaffAdminHomeWorkStudentId from '../components/staffAdmin/StaffAdminHomeWorkStudentId'
import StaffAdminInstructorMentor from '../components/staffAdmin/StaffAdminInstructorMentor'
import StaffAdminInstructorMentorProfile from '../components/staffAdmin/StaffAdminInstructorMentorProfile'
import StaffAdminLesson from '../components/staffAdmin/StaffAdminLesson'
import StaffAdminStudents from '../components/staffAdmin/StaffAdminStudents'
import StaffAdminLayouts from '../layouts/StaffAdminLayouts'

const StaffAdminRouts = () => {
  return (
    <Routes>
      <Route path='/' element={<StaffAdminLayouts />}>
        <Route path='/' element={<StaffAdminCard />} />
        <Route path='/inctructor' element={<StaffAdminInstructorMentor />} />
        <Route
          path='/inctructorOrMentor/:instructorMentorProfileID'
          element={<StaffAdminInstructorMentorProfile />}
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
        <Route path='login' element={<Autorization variant='Login' />} />
      </Route>
    </Routes>
  )
}
export default StaffAdminRouts
