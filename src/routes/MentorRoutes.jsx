import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MentorInstrucorGroups from '../components/mentor-instructor/Groups'
import MentorInstructorLessons from '../components/mentor-instructor/Lessons'
import { MentorInstructorNotifications } from '../components/mentor-instructor/Notifications'
import { MentorInstructorStudents } from '../components/mentor-instructor/Students'
import { MentorInstructorLayout } from '../layouts/MentorInstructor'

const MentorRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<MentorInstructorLayout />}>
        <Route path='/' element={<MentorInstrucorGroups />} />
        <Route
          path='/notifications'
          element={<MentorInstructorNotifications />}
        />
        <Route
          path='/lessons/:groupName/:groupId'
          element={<MentorInstructorLessons />}
        />
        <Route
          path='students/:groupName/:groupId'
          element={<MentorInstructorStudents />}
        />
      </Route>
    </Routes>
  )
}

export default MentorRoutes
