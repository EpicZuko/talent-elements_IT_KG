import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllCouseCardStaffAdmin } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import Card from '../UI/card/Card'

const StaffAdminCard = () => {
  const state = useSelector((state) => state.staffAdmin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCouseCardStaffAdmin())
  }, [])

  return (
    <DivStyled>
      <H5>Все группы</H5>
      <Card variant='mentor_instructor' user={state?.cardCouses} />
    </DivStyled>
  )
}

export default StaffAdminCard

const DivStyled = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 20px;
  }
`
const H5 = styled.h5`
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: hsla(201, 68%, 23%, 1);
  @media (max-width: 391px) {
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
`
