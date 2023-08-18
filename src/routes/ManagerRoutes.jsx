import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManagerGroup from '../components/manager/ManagerGroup'
import ManagerNotifications from '../components/manager/ManagerNotifications'
import ManagerStudnets from '../components/manager/ManagerStudnets'
import MainManagerLayout from '../layouts/manager/MainManagerLayout'

const ManagerRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainManagerLayout />}>
          <Route index element={<ManagerGroup />} />
          <Route path='/students' element={<ManagerStudnets />} />
          <Route path='/notification' element={<ManagerNotifications />} />
        </Route>
      </Routes>
    </div>
  )
}

export default ManagerRoutes
