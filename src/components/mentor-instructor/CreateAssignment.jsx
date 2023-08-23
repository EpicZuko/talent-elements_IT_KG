import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import arrowLeftIcon from '../../assets/icon/notificationIcons/strelka.svg'
import {
  MentorInstructorAction,
  postMentorAssignments,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Profile from '../UI/Profile'
import CustomizedSnackbars from '../UI/Snackbar'

export const MentorIsntructorCreateAssignment = () => {
  const [assignmentImg, setAssignmentImg] = useState(null)
  const [files, setFiles] = useState(null)
  const [assignmetValues, setAssignmentValues] = useState({
    title: '',
    description: '',
    days: '',
    score: '',
  })
  const state = SelectorFuncMentor()
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const dispatch = useDispatch()
  const AssignmentTitleHandler = (event) => {
    setAssignmentValues({
      title: event.target.value,
      days: assignmetValues.days,
      description: assignmetValues.description,
      score: assignmetValues.score,
    })
  }
  const AssignmentDescriptionHandler = (event) => {
    setAssignmentValues({
      description: event.target.value,
      title: assignmetValues.title,
      days: assignmetValues.days,
      score: assignmetValues.score,
    })
  }
  const AssignmentDaysHandler = (event) => {
    setAssignmentValues({
      days: event.target.value,
      title: assignmetValues.title,
      description: assignmetValues.description,
      score: assignmetValues.score,
    })
  }
  const AssignmentScoreHandler = (event) => {
    setAssignmentValues({
      score: event.target.value,
      days: assignmetValues.days,
      title: assignmetValues.title,
      description: assignmetValues.description,
    })
  }
  const navPrevPage = () => {
    navigate(-1)
  }
  const createAssignment = (event) => {
    event.preventDefault()
    if (
      assignmetValues.title.trim() !== '' &&
      assignmetValues.description.trim() !== '' &&
      assignmetValues.days !== '' &&
      assignmetValues.score.trim() !== '' &&
      assignmentImg !== null
    ) {
      dispatch(
        postMentorAssignments({
          id: lessonId,
          title: assignmetValues.title,
          description: assignmetValues.description,
          day: assignmetValues.days,
          score: assignmetValues.score,
          img: assignmentImg,
        })
      )
    }
    setAssignmentValues({
      title: '',
      description: '',
      days: '',
      score: '',
    })
    setFiles(null)
  }
  const closeSnackbar = () => {
    dispatch(
      MentorInstructorAction.SnackbarClose({
        isSuccess: false,
        status: state.status,
      })
    )
  }
  return (
    <div>
      <BackIcon onClick={navPrevPage} src={arrowLeftIcon} alt='none' />
      <AssignmentBlock onSubmit={createAssignment}>
        <AssignmentImageSetBlock>
          <Profile
            files={files}
            setFiles={setFiles}
            setFormat={setAssignmentImg}
          />
          <Input
            onChange={AssignmentTitleHandler}
            variant='enter-lesson'
            placeholder='Тапшырманын атын жазыңыз'
            value={assignmetValues.title}
          />

          <Input
            onChange={AssignmentDescriptionHandler}
            variant='enter-lesson'
            placeholder='Тапшырмага пикир жазыңыз'
            value={assignmetValues.description}
          />
          <Input
            onChange={AssignmentDaysHandler}
            variant='enter-lesson'
            placeholder='Мөөнөтү'
            value={assignmetValues.days}
          />
          <Input
            onChange={AssignmentScoreHandler}
            variant='enter-lesson'
            placeholder='Упай'
            value={assignmetValues.score}
          />
          <Button variant='create group-page'>Тапшырманы кошуу</Button>
        </AssignmentImageSetBlock>
      </AssignmentBlock>
      <CustomizedSnackbars
        variant={state.status}
        open={state.isSuccess}
        message={
          state.status === 'success'
            ? 'Куттуктайбыз!'
            : state.status === 'error' && 'Ката'
        }
        text={
          state.status === 'success'
            ? 'Тапшырма ийгиликтүү жүктөлдү '
            : state.status === 'error' && 'Сервер менен байланыша албай жатабыз'
        }
        closeSnackbar={closeSnackbar}
      />
    </div>
  )
}

const AssignmentBlock = styled.form`
  display: flex;
  justify-content: center;
  width: 1200px;
  gap: 50px;
  margin-top: 0px;
  @media (max-width: 415px) {
    margin-left: 0px;
    margin-top: 50px;
    width: 100%;
  }
`
const AssignmentImageSetBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 55.9px;
  @media (max-width: 415px) {
    width: 100%;
  }
`
const BackIcon = styled.img`
  cursor: pointer;
`
