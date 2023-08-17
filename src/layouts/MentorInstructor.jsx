import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/UI/Header'
import SiderBar from '../components/UI/SiderBar'
import { getMentorProfile } from '../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../utils/helpers/useSelector/SelectorFunc'

export const MentorInstructorLayout = () => {
  const dispatch = useDispatch()

  const state = SelectorFuncMentor()
  const navigate = useNavigate()

  const [show, setShow] = useState()
  const burger = () => {
    setShow((prev) => !prev)
  }
  useEffect(() => {
    dispatch(getMentorProfile())
  }, [])
  const navToNotifications = () => {
    navigate('/notifications')
  }
  const navToGroups = () => {
    navigate('/')
  }
  return (
    <div>
      <Header
        data={state?.getProfile}
        onClickNotification={navToNotifications}
        onBurgerMenuClick={burger}
      />
      <Block>
        <Container>
          <Outlet />
        </Container>
        <SideBlock>
          <SiderBar
            onClickMentorInstructorGroup={navToGroups}
            variant='mentor'
          />
        </SideBlock>
        {show && (
          <SiderBar
            onClickMentorInstructorGroup={navToGroups}
            variant='mentor'
            onCloseBackdrop={burger}
          />
        )}
      </Block>
    </div>
  )
}

const Container = styled.div`
  margin: 35px 35px 0px 43px;
  @media screen and (max-width: 415px) {
    margin-left: 35px;
  }
  @media screen and (max-width: 391px) {
    margin-left: 23px;
  }
`
const Block = styled.div`
  display: flex;
  justify-content: space-between;
`
const SideBlock = styled.div`
  @media screen and (max-width: 415px) {
    display: none;
  }
`
