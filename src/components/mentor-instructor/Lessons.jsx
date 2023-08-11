import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MentorLessonsRequest } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Lessons from '../UI/Lessons'

const MentorInstructorLessons = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = SelectorFuncMentor()

  useEffect(() => {
    dispatch(MentorLessonsRequest({ id: state.lessonsName }))
  }, [])

  const navToCourse = () => {
    navigate(-1)
  }
  return (
    <div>
      <Location>
        <LocationText onClick={navToCourse}>{state.lessonsName} /</LocationText>
        <LocationText2>Уроки</LocationText2>
      </Location>
      <Lessons variant='Mentor' element={{}} />
    </div>
  )
}

export default MentorInstructorLessons
const Location = styled.div`
  margin-bottom: 26px;
  display: flex;
  gap: 5px;
`
const LocationText = styled.p`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(135, 135, 135, 1);
  cursor: pointer;
`
const LocationText2 = styled.p`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(19, 71, 100, 1);
`
