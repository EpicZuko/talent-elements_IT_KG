import { Routes, Route } from 'react-router-dom'
import { MentorIsntructorCreateAssignment } from '../components/mentor-instructor/CreateAssignment'
import MentorCreateLesson from '../components/mentor-instructor/CreateLesson'
import { MentorEditLesson } from '../components/mentor-instructor/EditLesson'
import MentorInstrucorGroups from '../components/mentor-instructor/Groups'
import MentorInstructorLessons from '../components/mentor-instructor/Lessons'
import { MentorInstructorNotifications } from '../components/mentor-instructor/Notifications'
import { MentorInstrcutorProfile } from '../components/mentor-instructor/Profile'
import { MentorInstructorStudents } from '../components/mentor-instructor/Students'
import { MentorInstructorSubmissions } from '../components/mentor-instructor/Submissions'
import { MentorInstructorLayout } from '../layouts/MentorInstructor'

const MentorInstrucorRoute = () => {
  return (
    <Routes>
      <Route path='' element={<MentorInstructorLayout />}>
        <Route path='/' element={<MentorInstrucorGroups />} />
        <Route
          path='/notifications'
          element={<MentorInstructorNotifications />}
        />
        <Route path='/Profile' element={<MentorInstrcutorProfile />} />
        <Route
          path='/students/:groupName/:groupId'
          element={<MentorInstructorStudents />}
        />
        <Route
          path='/lessons/:groupName/:groupId'
          element={<MentorInstructorLessons />}
        />
        <Route
          path='/lessons/:groupName/:groupId/create-lesson'
          element={<MentorCreateLesson />}
        />
        <Route
          path='/lessons/:groupName/:groupId/edit_lesson/:lessonId'
          element={<MentorEditLesson />}
        />
        <Route
          path='/lessons/:groupName/:groupId/create_assignment/:lessonId'
          element={<MentorIsntructorCreateAssignment />}
        />
        <Route
          path='/lessons/:groupName/:groupId/homework/:studentName/:studentId'
          element={<MentorInstructorSubmissions />}
        />
      </Route>
    </Routes>
  )
}

export default MentorInstrucorRoute
