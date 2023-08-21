import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MentorInstructorNotifications } from '../components/mentor-instructor/Notifications'
import { MentorInstructorStudents } from '../components/mentor-instructor/Students'
import { MentorInstructorLayout } from '../layouts/MentorInstructor'

const MentorRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<MentorInstructorLayout />}>
        <Route
          path='/:groupName/:groupId'
          element={<MentorInstructorStudents />}
        />
        <Route
          path='/notifications'
          element={<MentorInstructorNotifications />}
        />
      </Route>
    </Routes>
  )
}

export default MentorRoutes
