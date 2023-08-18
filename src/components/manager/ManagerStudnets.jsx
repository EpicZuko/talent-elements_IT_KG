import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import {
  managerBlockStudents,
  managerGetStudents,
  managerPutNotPaidStudents,
  managerPutPaidStudents,
  managerUnlockStudents,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Input from '../UI/Input'
import Student from '../UI/Student'

const ManagerStudnets = () => {
  const [search, setSearch] = useState('')
  const [paid, setPaid] = useState(null)
  const dispatch = useDispatch()
  const state = useSelector((state) => state.manager)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(managerGetStudents())
  }, [paid, dispatch])
  const searchChangeValue = (event) => {
    setSearch(event.target.value)
  }
  const searchFilter = () => {
    const filterSearch = state?.managerStudents?.filter((elem) => {
      return elem?.name?.toLowerCase()?.includes(search)
    })
    return filterSearch
  }
  const filterSearch = searchFilter()
  const handlerPaidButton = (buttonId) => {
    setPaid(state.managerStudents)
    dispatch(managerPutNotPaidStudents({ id: buttonId.id }))
  }
  const handlerNotPaidButton = (elementId) => {
    setPaid(state.managerStudents)
    dispatch(managerPutPaidStudents({ id: elementId.id }))
  }
  const handlerBlockStudents = (elementId) => {
    dispatch(managerBlockStudents({ id: elementId.id }))
  }
  const handlerUnlockStudents = (elementId) => {
    dispatch(managerUnlockStudents({ id: elementId.id }))
  }
  const navigateStudentProfile = (id) => {
    navigate(`/students/${id}`)
  }
  return (
    <div>
      <ContainerDiv>
        <ContainerDiv2>
          <div>
            <H5>Студенты</H5>
          </div>
          <div>
            <Input
              onChange={searchChangeValue}
              variant='add Search'
              placeholder='Поиск...'
            />
          </div>
        </ContainerDiv2>
        <div>
          {filterSearch.length > 0 ? (
            <Student
              onClickStudentNotPaidButton={(element) =>
                handlerNotPaidButton(element)
              }
              onClickStudentPaidButton={(element) => handlerPaidButton(element)}
              onClickStudentBlockButton={(element) =>
                handlerBlockStudents(element)
              }
              onClickStudentUnlockButton={(element) =>
                handlerUnlockStudents(element)
              }
              variant='Students'
              variantClick='disbled'
              variantName='click'
              UserDataArray={filterSearch}
              onClickImgName={(element) => navigateStudentProfile(element.id)}
            />
          ) : (
            <h3>Такого студента нет</h3>
          )}
        </div>
      </ContainerDiv>
    </div>
  )
}

export default ManagerStudnets
const ContainerDiv = styled.div`
  width: 950px;
  @media (max-width: 391px) {
    width: 370px;
  }
`
const ContainerDiv2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 19px;
  @media (max-width: 391px) {
    flex-direction: column;
  }
`

const H5 = styled.h5`
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
  @media (max-width: 391px) {
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 22px;
  }
`
