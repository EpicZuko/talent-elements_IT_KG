import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getSeoAdminInstructorMentor } from '../../services/reducerSlice/seoAdminGroupsSlice/allGroups'
import Input from '../UI/Input'
import Student from '../UI/Student'

const SeoAdminInstructorMentor = () => {
  const [search, setSearch] = useState('')
  const state = useSelector((state) => state.seoAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getSeoAdminInstructorMentor())
  }, [])
  const searchChangeValue = (event) => {
    setSearch(event.target.value)
  }
  const searchFilter = () => {
    const filterSearch = state?.teachers?.filter((elem) => {
      return elem?.name?.toLowerCase()?.includes(search)
    })
    return filterSearch
  }
  const filterSearch = searchFilter()
  const clickInstructorOrMentorProfile = (id) => {
    navigate(`/instructor/${id}`)
  }
  return (
    <DivStyled>
      <div>
        <DivStyledInput>
          <H5>Инструкторлор жана Менторлор</H5>
          <DivInput>
            <Input
              variant='add Search'
              placeholder='Издөө...'
              onChange={searchChangeValue}
              value={search}
            />
          </DivInput>
        </DivStyledInput>
        <Div>
          {filterSearch.length > 0 ? (
            <Student
              variant='Staff_admin'
              UserDataArray={filterSearch}
              onClickElement={(element) =>
                clickInstructorOrMentorProfile(element.id)
              }
              variantClick='click'
            />
          ) : (
            <P>Азырынча бул жер бош</P>
          )}
        </Div>
      </div>
    </DivStyled>
  )
}

export default SeoAdminInstructorMentor

const DivStyled = styled.div`
  padding: 35px;
  width: 100%;
  @media (max-width: 391px) {
    width: 100%;
    padding: 0;
    overflow-x: scroll;
  }
`

const DivStyledInput = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  width: 950px;
  @media (max-width: 391px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    width: 100%;
  }
`
const DivInput = styled.div`
  @media (max-width: 391px) {
    display: none;
  }
`
const Div = styled.div`
  @media (max-width: 391px) {
    width: 390px;
    padding: 10px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    color: var(--light-blue, #134764);
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-left: 15px;
    padding-top: 15px;
  }
`
const P = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
`
