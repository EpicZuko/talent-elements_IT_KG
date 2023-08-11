import { Routes, Route } from 'react-router-dom'
// import Autorization from '../components/auth/Autorization'
import MentorInstructorCourses from '../components/mentor-instructor/Courses'
import MentorInstrucorGroups from '../components/mentor-instructor/Groups'
import MentorInstructorLessons from '../components/mentor-instructor/Lessons'
import { MentorInstructorNotifications } from '../components/mentor-instructor/Notifications'
import { MentorInstructorLayout } from '../layouts/MentorInstructor'

const MentorInstrucorRoute = () => {
  return (
    <Routes>
      <Route path='' element={<MentorInstructorLayout />}>
        <Route path='/' element={<MentorInstrucorGroups />} />
        <Route path='/:id' element={<MentorInstructorCourses />} />
        <Route path='/:id/:id' element={<MentorInstructorLessons />} />
        <Route
          path='/notifications'
          element={<MentorInstructorNotifications />}
        />
      </Route>
    </Routes>
  )
}

export default MentorInstrucorRoute
