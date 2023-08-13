import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/UI/Header'
import SiderBar from '../components/UI/SiderBar'
import { getProfileStaffAdmin } from '../services/reducerSlice/staffAdminSlice/staffAdmin'

const StaffAdminLayouts = () => {
  const [stateSideBarStaffAdmin, setStateSiderBar] = useState(false)
  const state = useSelector((state) => state.staffAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getProfileStaffAdmin())
  }, [])
  const sideBarOpenMenuBar = () => {
    setStateSiderBar(true)
  }
  const sideBarCloseMenuBar = () => {
    setStateSiderBar(false)
  }
  const navigateInstructorMentor = () => {
    navigate('/inctructor')
  }
  return (
    <div>
      <Header
        data={state?.getProfileStaffAdmin}
        onBurgerMenuClick={sideBarOpenMenuBar}
      />
      <DivStyled>
        <div>
          <Outlet />
        </div>
        <div>
          <StyledSection>
            <SiderBar
              variant='staf/admin'
              onClickStafAdminInstructor={navigateInstructorMentor}
            />
          </StyledSection>
          {stateSideBarStaffAdmin && (
            <SiderBar
              variant='staf/admin'
              onCloseBackdrop={sideBarCloseMenuBar}
              onClickStafAdminInstructor={navigateInstructorMentor}
            />
          )}
        </div>
      </DivStyled>
    </div>
  )
}

export default StaffAdminLayouts

const DivStyled = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledSection = styled.section`
  @media (max-width: 391px) {
    display: none;
  }
`
