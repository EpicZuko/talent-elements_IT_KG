import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStaffAdminHomeWorkStudent } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import HomeWorkTask from '../UI/HomeWorkTask'

const StaffAdminHomeWorkStudentId = () => {
  const [taks, setTask] = useState(null)
  const state = useSelector((state) => state.staffAdmin)
  const dispatch = useDispatch()
  const { assigmentId, submissionId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getStaffAdminHomeWorkStudent({ assigmentId, submissionId }))
  }, [assigmentId, submissionId])

  const goBackLesson = () => {
    navigate(-1)
  }
  return (
    <DivStyledHomeWork>
      <H6 onClick={goBackLesson}>
        Сабактар / <H5>{state?.getStaffAdminHomeWorkStudent?.studentName}</H5>
      </H6>
      <HomeWorkTask
        variant='admin'
        taskN1={taks}
        setTaskN1={setTask}
        Tasks={state?.getStaffAdminHomeWorkStudent?.homeWorkArray}
        OnswerHomeWork={state?.getStaffAdminHomeWorkStudent?.answer}
      />
    </DivStyledHomeWork>
  )
}

export default StaffAdminHomeWorkStudentId

const DivStyledHomeWork = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 20px;
    width: 300px;
  }
`
const H6 = styled.h6`
  color: rgba(135, 135, 135, 1);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  @media (max-width: 391px) {
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
`
const H5 = styled.h5`
  color: rgba(19, 71, 100, 1);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 391px) {
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
`
