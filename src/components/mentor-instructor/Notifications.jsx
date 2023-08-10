import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrowLeftIcon from '../../assets/icon/notificationIcons/strelka.svg'
import { MentorRequest } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Notifications from '../UI/Notifications'

export const MentorInstructorNotifications = () => {
  const navigate = useNavigate()
  const navToPrevPage = () => {
    navigate(-1)
  }
  const state = SelectorFuncMentor()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(MentorRequest({ page: 'notifcations' }))
  }, [dispatch])
  return (
    <div>
      <Location>
        <ArrowLeft onClick={navToPrevPage} src={arrowLeftIcon} alt='none' />
        <LocationText>Уведомление</LocationText>
      </Location>
      {state.notifications.map(
        (el) =>
          el.message && (
            <Notifications
              variant='MentorNotifications'
              mentorData={{
                group: '',
                lesson: '',
                value: '',
                comment: el.message || '',
              }}
            />
          )
      )}
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
