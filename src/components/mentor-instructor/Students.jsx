import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  getMentorStudents,
  putMentorStudents,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import Student from '../UI/Student'

export const MentorInstructorStudents = () => {
  const navigate = useNavigate()

  const state = useSelector((state) => state.mentorInstructor)

  const navToGroup = () => {
    navigate('/')
  }
  const { name, groupId } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMentorStudents({ id: groupId }))
  }, [])

  const deleteStudents = (element) => {
    dispatch(putMentorStudents({ id: element.studentId }))
  }

  return (
    <div>
      <Location>
        <LocationText onClick={navToGroup}>Мои группы /</LocationText>
        <LocationText2>Студенты: {name}</LocationText2>
      </Location>
      <StudentBlock>
        <Student
          variant='mentor/instructors'
          UserDataArray={state.getStudents}
          onClickMentorDeleteButton={deleteStudents}
          variantClick='disbled'
        />
      </StudentBlock>
    </div>
  )
}

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
  @media (max-width: 415px) {
    font-size: 16px;
  }
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
  @media (max-width: 415px) {
    font-size: 16px;
  }
`
const StudentBlock = styled.div`
  @media (max-width: 415px) {
    width: 380px;
    overflow-x: scroll;
  }
  @media (max-width: 391px) {
    width: 360px;
    overflow-x: scroll;
  }
`
