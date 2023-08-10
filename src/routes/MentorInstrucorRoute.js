import { Routes, Route } from 'react-router-dom'
// import Autorization from '../components/auth/Autorization'
import MentorInstructorExcerices from '../components/mentor-instructor/Excerices'
import MentorInstrucorGroups from '../components/mentor-instructor/Groups'
import MentorInstructorLessons from '../components/mentor-instructor/Lessons'
import { MentorInstructorNotifications } from '../components/mentor-instructor/Notifications'
import MentroInstructorStudents from '../components/mentor-instructor/Students'
import { MentorInstructorLayout } from '../layouts/MentorInstructor'

const MentorInstrucorRoute = () => {
  return (
    <Routes>
      <Route path='' element={<MentorInstructorLayout />}>
        <Route path='/groups' element={<MentorInstrucorGroups />} />
        <Route path='groups/:id' element={<MentorInstructorLessons />} />
        <Route path='groups/students' element={<MentroInstructorStudents />} />
        <Route
          path='groups/students/:id'
          element={<MentorInstructorExcerices />}
        />
        <Route
          path='/notifications'
          element={<MentorInstructorNotifications />}
        />
      </Route>
    </Routes>
  )
}

export default MentorInstrucorRoute
