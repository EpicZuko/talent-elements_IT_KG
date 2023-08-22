import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import Header from '../../components/UI/Header'
import SiderBar from '../../components/UI/SiderBar'
import { managerGetProfile } from '../../services/reducerSlice/manager/managerSlice/managerSlice'

const MainManagerLayout = () => {
  const navigate = useNavigate()
  const [stateManagerSideBar, setStateManagerSideBar] = useState(null)
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(managerGetProfile())
  }, [state.headerNotification])

  const sideBarOpen = () => {
    setStateManagerSideBar(true)
  }

  const sideBarClose = () => {
    setStateManagerSideBar(false)
  }

  const handlerManagerGroupLayout = () => {
    navigate('/')
  }

  const handlerStudentsLayout = () => {
    navigate('/students')
  }

  const handlerNotifications = () => {
    navigate('/notification')
  }

  const navigetInstructorOrMentor = () => {
    navigate('/instructorOrMentor')
  }

  const navigateStaffAdmin = () => {
    navigate('/staffAdmin')
  }

  const navigetSeoAdmin = () => {
    navigate('/seoAdmin')
  }

  const navigateManagerProfile = () => {
    navigate('/profile')
  }
  return (
    <div>
      <Header
        data={state?.managerProfile}
        onBurgerMenuClick={sideBarOpen}
        onClickNotification={handlerNotifications}
        onClickProfile={navigateManagerProfile}
      />
      <Container>
        <ContainerDiv2>
          <Outlet />
        </ContainerDiv2>
        <div>
          {stateManagerSideBar && (
            <SiderBar
              variant='manager'
              onClickManagerGroup={handlerManagerGroupLayout}
              onClickManagerStudent={handlerStudentsLayout}
              onCloseBackdrop={sideBarClose}
              onClickManagerInstructor={navigetInstructorOrMentor}
              onClickManagerStafAdmin={navigateStaffAdmin}
              onClickManagerSeoAdmin={navigetSeoAdmin}
            />
          )}
          <StyledSiderBar>
            <SiderBar
              variant='manager'
              onClickManagerGroup={handlerManagerGroupLayout}
              onClickManagerStudent={handlerStudentsLayout}
              onClickManagerInstructor={navigetInstructorOrMentor}
              onClickManagerStafAdmin={navigateStaffAdmin}
              onClickManagerSeoAdmin={navigetSeoAdmin}
            />
          </StyledSiderBar>
        </div>
      </Container>
    </div>
  )
}

export default MainManagerLayout

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const ContainerDiv2 = styled.div`
  width: 100%;
  padding: 35px;
  @media (max-width: 391px) {
    padding: 20px;
  }
`
const StyledSiderBar = styled.div`
  display: block;
  @media (max-width: 391px) {
    display: none;
  }
`
