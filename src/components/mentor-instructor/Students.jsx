import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  getMentorStudents,
  putMentorStudents,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import Button from '../UI/Button'
import Modall from '../UI/Modal'
import Student from '../UI/Student'

export const MentorInstructorStudents = () => {
  const navigate = useNavigate()

  const state = useSelector((state) => state.mentorInstructor)
  useEffect(() => {
    dispatch(getMentorStudents({ groupId }))
  }, [])

  const navToGroup = () => {
    navigate('/')
  }
  const { name, groupId } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [studentId, setStudentId] = useState(null)
  const modalShow = (element) => {
    setStudentId(element.studentId)
    setShowModal(true)
  }
  const modalClose = () => {
    setShowModal(false)
  }
  const dispatch = useDispatch()

  const deleteStudents = () => {
    dispatch(putMentorStudents({ id: studentId, groupId }))
    modalClose()
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
          onClickMentorDeleteButton={modalShow}
          variantClick='disbled'
        />
      </StudentBlock>
      {showModal && (
        <Modall onClose={modalClose}>
          <ModalBlock>
            <OnDeleteText>Вы хотите удалить студента ?</OnDeleteText>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button variant='RequestRefusal-Buttons' onClick={deleteStudents}>
                Да
              </Button>
              <Button variant='RequestAllow-Buttons' onClick={modalClose}>
                Нет
              </Button>
            </div>
          </ModalBlock>
        </Modall>
      )}
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

const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const OnDeleteText = styled.h1`
  font-size: 20px;
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 50px;
`
