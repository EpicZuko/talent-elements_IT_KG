import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import {
  managerGetStudents,
  managerPutStudents,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Input from '../UI/Input'
import Student from '../UI/Student'

const ManagerStudnets = () => {
  const [search, setSearch] = useState('')
  const [studentId, setStudentId] = useState({})
  const dispatch = useDispatch()
  const state = useSelector((state) => state.manager)
  useEffect(() => {
    dispatch(managerGetStudents())
  }, [dispatch])
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
  //   console.log(state)
  const handlerButton = (buttonId) => {
    setStudentId(buttonId)
  }
  return (
    <div>
      <div>
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
          <Student
            onClickStudentBlockButton={handlerButton}
            onClickElement={handlerButton}
            variant='Students'
            UserDataArray={filterSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default ManagerStudnets
const ContainerDiv2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  }
`
