import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { getCoursesStudent } from '../../services/reducerSlice/studentSlice/studentAction'
import Card from '../UI/card/Card'

const StudentCard = () => {
  const state = useSelector((state) => state.student)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoursesStudent())
  }, [])
  return (
    <DivStudentCourses>
      <H5>Все уроки</H5>
      <Card variant='User_doctrine' user={state?.getStudentCourses} />
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
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`