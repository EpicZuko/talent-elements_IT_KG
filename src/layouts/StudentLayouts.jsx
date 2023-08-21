import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/UI/Header'
import SiderBar from '../components/UI/SiderBar'
import { getStudentProfile } from '../services/reducerSlice/studentSlice/studentAction'

const StudentLayouts = () => {
  const [stateUserSideBar, setStateUserSideBar] = useState(false)
  const state = useSelector((state) => state.student)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getStudentProfile())
  }, [dispatch])

  const sideBarUserOpenMenu = () => {
    setStateUserSideBar(true)
  }

  const sideBarUserCloseMenu = () => {
    setStateUserSideBar(false)
  }

  const clickNavigateNotification = () => {
    navigate('/notification')
  }

  const clickNavigateCard = () => {
    navigate('/my_group')
  }

  const clickNavigateCourse = () => {
    navigate('/')
  }

  const clickNavigateProfile = () => {
    navigate('/profile')
  }
  return (
    <div>
      <Header
        onClickNotification={clickNavigateNotification}
        onClickProfile={clickNavigateProfile}
        onBurgerMenuClick={sideBarUserOpenMenu}
        data={state?.studentProfile?.studentProfile}
      />
      <DivContainer>
        <div>
          <Outlet />
        </div>

        <StyledSection>
          <SiderBar
            onClickUserGroup={clickNavigateCard}
            onClickUserCourse={clickNavigateCourse}
            onCloseBackdrop={sideBarUserCloseMenu}
            variant='user'
          />
        </StyledSection>
        {stateUserSideBar && (
          <SiderBar
            onClickUserGroup={clickNavigateCard}
            onClickUserCourse={clickNavigateCourse}
            onCloseBackdrop={sideBarUserCloseMenu}
            onClickUserProfile={clickNavigateProfile}
            variant='user'
          />
        )}
      </DivContainer>
    </div>
  )
}

export default StudentLayouts

const DivContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledSection = styled.section`
  @media (max-width: 391px) {
    display: none;
  }
`
