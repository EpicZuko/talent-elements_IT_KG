/* eslint-disable no-console */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MentorGroupRequest } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Card from '../UI/card/Card'

const MentorInstrucorGroups = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = SelectorFuncMentor()
  useEffect(() => {
    dispatch(MentorGroupRequest({ id: 1 }))
  }, [])
  const navToGroup = (loc) => {
    navigate(loc)
  }
  const navToStudents = () => {
    navigate('/students')
  }
  return (
    <div>
      <LocationText>Мои группы</LocationText>
      {state.groups.map((el) => (
        <Card
          variant='mentor_instructor'
          user={[el]}
          navToCurrentGroup={() => {
            navToGroup(el.title)
          }}
          navToStudents={navToStudents}
          onClickHandler={() => {
            navToGroup(el.title)
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
