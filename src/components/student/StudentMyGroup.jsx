import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStudentMyGroup } from '../../services/reducerSlice/studentSlice/studentAction'
import Student from '../UI/Student'

const StudentMyGroup = () => {
  const state = useSelector((state) => state.student)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStudentMyGroup())
  }, [])
  return (
    <DivBlockContainer>
      <H5>Мои группа</H5>
      <StudentContianer>
        {state?.getStudentMyGroup.length > 0 ? (
          <Student
            variant='User_Group'
            UserDataArray={state?.getStudentMyGroup}
            variantClick='disbled'
          />
        ) : (
          <p>Совпадений не найдено.</p>
        )}
      </StudentContianer>
    </DivBlockContainer>
  )
}
export default StudentMyGroup

const DivBlockContainer = styled.div`
  width: 100%;
  padding: 35px;
  @media screen and (max-width: 391px) {
    padding: 0px;
    padding-left: 10px;
    padding-top: 20px;
  }
`
const StudentContianer = styled.div`
  margin-top: 10px;
  @media (max-width: 391px) {
    width: 320px;
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
