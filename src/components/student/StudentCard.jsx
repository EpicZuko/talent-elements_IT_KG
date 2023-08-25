import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { getCoursesStudent } from '../../services/reducerSlice/studentSlice/studentAction'
import Card from '../UI/card/Card'

const StudentCard = () => {
  const state = useSelector((state) => state.student)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCoursesStudent())
  }, [])

  const navToGroupVideo = () => {
    navigate('/lesson')
  }

  return (
    <DivStudentCourses>
      <H5>Сабактар</H5>

      <Card
        variant='User_doctrine'
        user={state?.getStudentCourses}
        navToCurrentGroup={(element) => navToGroupVideo(element.id)}
      />
    </DivStudentCourses>
  )
}
export default StudentCard

const DivStudentCourses = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 20px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
