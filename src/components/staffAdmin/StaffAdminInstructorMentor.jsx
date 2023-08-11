import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { getStudentStaffAdmin } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import Input from '../UI/Input'
import Student from '../UI/Student'

const StaffAdminInstructorMentor = () => {
  const [search, setSearch] = useState('')
  const state = useSelector((state) => state.staffAdmin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStudentStaffAdmin())
  }, [])
  const searchInputValue = (event) => {
    setSearch(event.target.value)
  }
  const searchFilterStaffAdminTeachers = () => {
    const searchFilter = state?.statusFindTeacherData.filter((elem) => {
      return elem?.name?.toLowerCase().includes(search)
    })
    return searchFilter
  }
  const filterSearchTeachers = searchFilterStaffAdminTeachers()
  return (
    <Div>
      <DivContainerSearch>
        <div>
          <Instrucktor>Инструкторы,Мен</Instrucktor>
        </div>
        <DivInput>
          <Input
            variant='add Search'
            placeholder='Поиск'
            onChange={searchInputValue}
            value={search}
          />
        </DivInput>
      </DivContainerSearch>
      <DivStudent>
        {filterSearchTeachers.length > 0 ? (
          <Student variant='Staff_admin' UserDataArray={filterSearchTeachers} />
        ) : (
          <p>Совпадений не найдено.</p>
        )}
      </DivStudent>
    </Div>
  )
}

export default StaffAdminInstructorMentor

const Div = styled.div`
  padding: 35px;
  width: 1090px;
  @media (max-width: 391px) {
    width: 100%;
    padding: 0px;
    margin-top: 20px;
    margin-left: 10px;
  }
`
const DivStudent = styled.div`
  @media (max-width: 391px) {
    overflow-x: scroll;
    width: 370px;
  }
`
const Instrucktor = styled.h5`
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
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
const DivContainerSearch = styled.div`
  margin-bottom: 19px;
  width: 93%;
  display: flex;
  justify-content: space-between;
`
const DivInput = styled.div`
  @media (max-width: 391px) {
    display: none;
  }
`