import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/UI/Header'
import SiderBar from '../components/UI/SiderBar'
import { MentorHeaderRequest } from '../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../utils/helpers/useSelector/SelectorFunc'

export const MentorInstructorLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const state = SelectorFuncMentor()

  const navToGroup = () => {
    navigate('groups')
  }
  const navToNotifications = () => {
    navigate('/notifications')
  }
  const [show, setShow] = useState()
  const burger = () => {
    setShow((prev) => !prev)
  }
  useEffect(() => {
    dispatch(MentorHeaderRequest())
  }, [dispatch])
  return (
    <div>
      <Header
        data={{ name: state.name, img: state.avatar }}
        onBurgerMenuClick={burger}
        onClickNotification={navToNotifications}
      />
      <Block>
        <Container>
          <Outlet />
        </Container>
        <SideBlock>
          <SiderBar
            variant='mentor'
            onClickMentorInstructorGroup={navToGroup}
          />
        </SideBlock>
        {show && (
          <SiderBar
            variant='mentor'
            onClickMentorInstructorGroup={navToGroup}
            onCloseBackdrop={burger}
          />
        )}
      </Block>
    </div>
  )
}

const Container = styled.div`
  margin: 35px 35px 0px 43px;
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
