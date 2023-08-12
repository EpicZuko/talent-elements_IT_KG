import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/UI/Header'
import SiderBar from '../components/UI/SiderBar'
import { getProfile } from '../services/reducerSlice/seoAdminGroupsSlice/allGroups'

const SeoAdminLayouts = () => {
  const [stateSideBar, setStateSideBar] = useState(null)
  const state = useSelector((state) => state.seoAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const OpenSideBarHandler = () => {
    setStateSideBar(true)
  }
  const CloseSideBarHandler = () => {
    setStateSideBar(false)
  }

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const notificationNavigateSeoAdmin = () => {
    navigate('/notification')
  }
  const profileNavigateSeoAdmin = () => {
    navigate('/profile')
  }
  const clickNavigateGroup = () => {
    navigate('/')
  }
  const clickNavigateInstructor = () => {
    navigate('/instructor')
  }
  const clickNavigateManager = () => {
    navigate('/manager')
  }
  return (
    <div>
      <Header
        data={state?.profileSeoAdmin}
        onBurgerMenuClick={OpenSideBarHandler}
        onClickNotification={notificationNavigateSeoAdmin}
        onClickProfile={profileNavigateSeoAdmin}
      />
      <DivSeoAdmin>
        <div>
          <Outlet />
        </div>
        <StyledSideBar>
          <SiderBar
            variant='seo/admin'
            onClickSeoAdminInstructor={clickNavigateInstructor}
            onClickSeoAdminManager={clickNavigateManager}
            onClickSeoAdminGroup={clickNavigateGroup}
            absoluteNone='none'
            onCloseBackdrop={CloseSideBarHandler}
          />
        </StyledSideBar>
        {stateSideBar && (
          <SiderBar
            variant='seo/admin'
            onClickSeoAdminInstructor={clickNavigateInstructor}
            onClickSeoAdminManager={clickNavigateManager}
            onClickSeoAdminGroup={clickNavigateGroup}
            absoluteNone='none'
            onCloseBackdrop={CloseSideBarHandler}
          />
        )}
      </DivSeoAdmin>
    </div>
  )
}

export default SeoAdminLayouts

const DivSeoAdmin = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledSideBar = styled.div`
  @media screen and (max-width: 391px) {
    display: none;
  }
`
