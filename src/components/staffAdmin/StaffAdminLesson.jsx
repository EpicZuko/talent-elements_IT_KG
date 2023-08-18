import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStaffAdminLesson } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import Lessons from '../UI/Lessons'

const StaffAdminLesson = () => {
  const state = useSelector((state) => state.staffAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lessonsId } = useParams()

  useEffect(() => {
    dispatch(
      getStaffAdminLesson({
        id: +lessonsId,
      })
    )
  }, [lessonsId])

  const navigateHomeWorkStudentId = (element) => {
    console.log(element)
    navigate(
      `/lessons/submission/${element.submissionId}/assigment/${element.assigmentId}`
    )
  }
  return (
    <DivLesson>
      <H6>
        JAVA 5 /<H5> Уроки</H5>
      </H6>
      <DivStyled>
        {state.getStaffAdminLesson.length > 0 ? (
          state?.getStaffAdminLesson.map((element) => (
            <Lessons
              variant='Mentor'
              element={element}
              variantClick='click'
              onClickStudent={(element) => navigateHomeWorkStudentId(element)}
            />
          ))
        ) : (
          <H3>У вас еще нет уроков</H3>
        )}
      </DivStyled>
    </DivLesson>
  )
}

export default StaffAdminLesson

const DivLesson = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 0px;
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
  margin-bottom: 11px;
  @media (max-width: 391px) {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 16px;
    margin-bottom: 0px;
  }
`
const H5 = styled.h5`
  color: rgba(19, 71, 100, 1);
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 5px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const DivStyled = styled.div`
  @media (max-width: 391px) {
    width: 100px;
  }
`
const H3 = styled.h3`
  margin-left: 5px;
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  @media (max-width: 391px) {
    width: 200px;
    margin-left: 40px;
    margin-top: 20px;
  }
`
