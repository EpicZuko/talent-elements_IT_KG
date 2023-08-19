import { Routes, Route } from 'react-router-dom'
// import Autorization from '../components/auth/Autorization'
import MentorInstrucorGroups from '../components/mentor-instructor/Groups'
import MentorInstructorLessons from '../components/mentor-instructor/Lessons'
import { MentorInstructorNotifications } from '../components/mentor-instructor/Notifications'
import { MentorInstructorStudents } from '../components/mentor-instructor/Students'
import { MentorInstructorLayout } from '../layouts/MentorInstructor'

const MentorInstrucorRoute = () => {
  return (
    <Routes>
      <Route path='' element={<MentorInstructorLayout />}>
        <Route path='/' element={<MentorInstrucorGroups />} />
        <Route
          path='/students/:name/:groupId'
          element={<MentorInstructorStudents />}
        />
        <Route
          path='/notifications'
          element={<MentorInstructorNotifications />}
        />
        <Route
          path='/lessons/:groupName/:groupId'
          element={<MentorInstructorLessons />}
        />
      </Route>
    </Routes>
  )
}

export default MentorInstrucorRoute
