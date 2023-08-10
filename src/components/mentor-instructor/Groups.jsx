/* eslint-disable no-console */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  MentorInstructorAction,
  MentorRequest,
} from '../../services/mentorInstructorSlice/Body'
import { SelectorFuncMentorBody } from '../../utils/helpers/useSelector/SelectorFunc'
import Card from '../UI/card/Card'

const MentorInstrucorGroups = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = SelectorFuncMentorBody()
  console.log(state.groups)
  useEffect(() => {
    dispatch(MentorRequest({ page: 'groups', id: 1 }))
  }, [dispatch])
  const navToGroup = (loc) => {
    dispatch(MentorInstructorAction.findLessonsByCourseName(loc))
    navigate(loc)
  }
  const navToStudents = () => {
    navigate('students')
  }
  return (
    <div>
      <LocationText>Мои группы</LocationText>
      {state.groups.map((el) => (
        <Card
          variant='mentor_instructor'
          user={[
            {
              id: el.id,
              title: el.name,
              lesson: state.lessonsCount,
              img: el.photo,
            },
          ]}
          navToCurrentGroup={() => {
            navToGroup(el.name)
          }}
          navToStudents={navToStudents}
          onClickHandler={() => {
            navToGroup(el.name)
          }}
        />
      ))}
    </div>
  )
}

export default MentorInstrucorGroups

const LocationText = styled.p`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(19, 71, 100, 1);
`
