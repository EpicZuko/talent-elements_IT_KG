import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrowLeftIcon from '../../assets/icon/notificationIcons/strelka.svg'
import {
  MentorInstructorAction,
  getMentorNotifications,
  postMentorStudentSubmission,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Notifications from '../UI/Notifications'
import CustomizedSnackbars from '../UI/Snackbar'

export const MentorInstructorNotifications = () => {
  const [comment, setComment] = useState('')
  const [score, setScore] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMentorNotifications())
  }, [])

  const scoreInputHandler = (event) => {
    setScore(event.target.value)
  }
  const commentInputHandler = (event) => {
    setComment(event.target.value)
  }

  const state = SelectorFuncMentor()
  const navigate = useNavigate()
  const navToPrevPage = () => {
    navigate(-1)
  }
  const checkSubmissonStudent = (data) => {
    if (comment.trim() !== '' && score.trim() !== '') {
      dispatch(
        postMentorStudentSubmission({
          studentId: data.studentId,
          submissionId: data.submissionId,
          score,
          comment,
        })
      )
      setComment('')
      setScore('')
    }
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
      <Location>
        <ArrowLeft onClick={navToPrevPage} src={arrowLeftIcon} alt='none' />
        <LocationText>Билдирүү</LocationText>
      </Location>
      {state.getNotifications.map((el) => {
        return (
          <Notifications
            sendButtonClick={() =>
              checkSubmissonStudent({
                submissionId: el.submissionId,
                studentId: el.studentId,
              })
            }
            variant='MentorNotifications'
            mentorData={el}
            commentInputHandler={commentInputHandler}
            scoreInputHandler={scoreInputHandler}
            score={score}
            comment={comment}
          />
        )
      })}
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
            ? 'Билдирүү ийгиликтүү жөнөтүлдү'
            : state.status === 'error' && 'Сервер менен байланыша албай жатабыз'
        }
        closeSnackbar={closeSnackbar}
      />
    </div>
  )
}

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  margin-bottom: 30px;
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
  color: rgba(19, 71, 100, 1);
  @media (max-width: 415px) {
    color: var(--light-blue, #134764);
    font-family:
      Zen Kaku Gothic New,
      sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
const ArrowLeft = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  cursor: pointer;
`
