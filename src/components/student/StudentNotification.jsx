import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStudentNotification } from '../../services/reducerSlice/studentSlice/studentAction'
import Notifications from '../UI/Notifications'

const StudentNotification = () => {
  const state = useSelector((state) => state.student)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentNotification())
  }, [])

  return (
    <StyledDivStudentNotification>
      <H5>Уведомление</H5>
      {state.getStudentNotification.length > 0 ? (
        state?.getStudentNotification?.map((element) => (
          <Notifications variant='StudentNotifications' studentData={element} />
        ))
      ) : (
        <P>на данный момент у вас нет новых уведомлений</P>
      )}
    </StyledDivStudentNotification>
  )
}
export default StudentNotification

const StyledDivStudentNotification = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 20px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 19px;
  @media (max-width: 391px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`
const P = styled.p`
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 10px;
`
