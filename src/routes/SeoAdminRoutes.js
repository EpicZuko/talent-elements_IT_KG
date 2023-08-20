import { Routes, Route } from 'react-router-dom'
import SeoAdminGroup from '../components/seo_admin/SeoAdminGroups'
import SeoAdminInstructorMentor from '../components/seo_admin/SeoAdminInstructorMentor'
import SeoAdminInstructorMentorProfile from '../components/seo_admin/SeoAdminInstructorMentorProfile'
import SeoAdminManager from '../components/seo_admin/SeoAdminManager'
import SeoAdminProfile from '../components/seo_admin/SeoAdminProfile'
import SeoAdminStudentProfile from '../components/seo_admin/SeoAdminStudentProfile'
import SeoAdminStudent from '../components/seo_admin/SeoAdminStudents'
import SeoAdminLayouts from '../layouts/SeoAdminLayouts'
import Error from './Error'

function SeoAdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SeoAdminLayouts />}>
          <Route path='/' element={<SeoAdminGroup />} />
          <Route path='/:id' element={<SeoAdminStudent />} />
          <Route
            path='/:id/:studentProfile'
            element={<SeoAdminStudentProfile />}
          />
          <Route path='/instructor' element={<SeoAdminInstructorMentor />} />
          <Route
            path='/instructor/:instructorId'
            element={<SeoAdminInstructorMentorProfile />}
          />
          <Route path='/manager' element={<SeoAdminManager />} />
          <Route path='/student' element={<SeoAdminStudent />} />
          <Route path='/profile' element={<SeoAdminProfile />} />
          <Route path='*' element={<Error />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default SeoAdminRoutes
