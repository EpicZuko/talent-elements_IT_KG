import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrowLeftIcon from '../../assets/icon/notificationIcons/strelka.svg'
import { MentorNotificationsRequest } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Notifications from '../UI/Notifications'

export const MentorInstructorNotifications = () => {
  const navigate = useNavigate()
  const navToPrevPage = () => {
    navigate(-1)
  }
  const mentorData = useSelector((state) => state.login)
  console.log(mentorData)
  const state = SelectorFuncMentor()
  console.log(state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(MentorNotificationsRequest())
  }, [])
  return (
    <div>
      <Location>
        <ArrowLeft onClick={navToPrevPage} src={arrowLeftIcon} alt='none' />
        <LocationText>Уведомление</LocationText>
      </Location>
      <Notifications
        variant='MentorNotifications'
        mentorData={{
          email: mentorData.login.email,
          username: state.profile.name,
          comment: '',
        }}
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
`
const ArrowLeft = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  cursor: pointer;
`
