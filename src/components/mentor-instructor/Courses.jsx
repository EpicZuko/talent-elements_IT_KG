import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  MentorCoursesRequest,
  MentorInstructorAction,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import LessonsCard from '../UI/LessonsCard'

const MentorInstructorCourses = () => {
  const navigate = useNavigate()
  const state = SelectorFuncMentor()
  const navToGroup = () => {
    navigate('/')
  }
  const navToLessons = (loc) => {
    dispatch(MentorInstructorAction.findLessonsBy({ lessonsname: loc }))
    navigate(loc)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(MentorCoursesRequest({ id: state.courseId }))
  }, [])
  console.log(state.courses)
  return (
    <div>
      <Location>
        <LocationText onClick={navToGroup}>Мои группы /</LocationText>
        <LocationText2>Уроки {state.courseName}</LocationText2>
      </Location>
      <div>
        {state.courses.map((el) => (
          <LessonsCard
            onClick={() => {
              navToLessons(el.name)
            }}
            group={[
              {
                id: el.id,
                title: el.name,
                img: el.photo,
              },
            ]}
          />
        ))}
      </div>
    </div>
  )
}

export default MentorInstructorCourses

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
