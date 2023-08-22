import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Autorization from '../components/auth/Autorization'
import StudentCard from '../components/student/StudentCard'
import StudentHomeWork from '../components/student/StudentHomeWork'
import StudentLesson from '../components/student/StudentLesson'
import StudentMyGroup from '../components/student/StudentMyGroup'
import StudentMyProfile from '../components/student/StudentMyProfile'
import StuedentNotification from '../components/student/StudentNotification'
import StudentProfile from '../components/student/StudentProfile'
import StudentLayouts from '../layouts/StudentLayouts'
import Error from './Error'
import LoadingSpinner from './LoadingSpinner'

const StudentRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/' element={<StudentLayouts />}>
            <Route path='/' element={<StudentCard />} />
            <Route path='/lesson' element={<StudentLesson />} />
            <Route path='/my_group' element={<StudentMyGroup />} />
            <Route
              path='/my_group/student_profile/:studentId'
              element={<StudentProfile />}
            />
            <Route path='/profile' element={<StudentMyProfile />} />
            <Route path='/notification' element={<StuedentNotification />} />
            <Route path='/lesson/:assignmentId' element={<StudentHomeWork />} />
            <Route path='login' element={<Autorization variant='Login' />} />
            <Route path='*' element={<Error variant='page' />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  )
}
export default StudentRoutes
