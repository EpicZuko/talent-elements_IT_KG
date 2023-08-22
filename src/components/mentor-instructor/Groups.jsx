/* eslint-disable no-console */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getMentorGroups } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Card from '../UI/card/Card'

const MentorInstrucorGroups = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = SelectorFuncMentor()
  useEffect(() => {
    dispatch(getMentorGroups())
  }, [])

  const navToStudents = (element) => {
    navigate(`students/${element.title}/${element.id}`)
  }
  const navToLessons = (element) => {
    navigate(`lessons/${element.title}/${element.id}`)
  }
  return (
    <div>
      <LocationText>Менин тайпаларым</LocationText>
      <Card
        variant='mentor_instructor'
        user={state.getCardGroups}
        navToStudents={navToStudents}
        onClickStudents={navToStudents}
        navToCurrentGroup={navToLessons}
        onClickHandler={navToLessons}
      />
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
  @media (max-width: 391px) {
    color: var(--light-blue, #134764);
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
