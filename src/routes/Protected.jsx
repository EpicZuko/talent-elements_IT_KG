import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Autorization from '../components/auth/Autorization'
import Error from './Error'

const Protected = () => {
  const [stateVariant, setVariant] = useState(false)

  const Login = () => {
    setVariant((prev) => (prev === '' ? 'Login' : ''))
  }
  return (
    <Routes>
      <Route
        path='/'
        element={<Autorization variant={stateVariant} onClickVariant={Login} />}
      />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default Protected
