import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { managerGetAllGroups } from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Card from '../UI/card/Card'
import Input from '../UI/Input'

const ManagerGroup = () => {
  const [search, setSearch] = useState('')
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(managerGetAllGroups())
  }, [])
  const searchChangeValue = (event) => {
    setSearch(event.target.value)
  }
  const searchFilter = () => {
    const filterSearch = state?.managerCard?.filter((elem) => {
      return elem?.title?.toLowerCase()?.includes(search)
    })
    return filterSearch
  }
  const filterSearch = searchFilter()
  return (
    <div>
      <ContainerDiv1>
        <div>
          <TitleH5>Группы</TitleH5>
        </div>
        <ContainerDiv2>
          <StyledDivInput>
            <Input
              variant='adds-search'
              placeholder='Поиск...'
              onChange={searchChangeValue}
            />
          </StyledDivInput>
          <Button variant='create group'>
            <StyledSpan>Создать группу</StyledSpan>
          </Button>
        </ContainerDiv2>
      </ContainerDiv1>
      {filterSearch.length ? (
        <Card user={filterSearch} variant='Manager_group' />
      ) : (
        <H3>Совпадений не найдено</H3>
      )}
    </div>
  )
}

export default ManagerGroup

const TitleH5 = styled.h5`
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
    color: rgba(19, 71, 100, 1);
  }
`
const ContainerDiv1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 391px) {
    width: 100%;
    flex-direction: column;
  }
`
const ContainerDiv2 = styled.div`
  @media (max-width: 391px) {
    margin-top: 22px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`
const StyledDivInput = styled.div`
  @media (min-width: 391px) {
    display: none;
  }
`
const StyledSpan = styled.span`
  @media (max-width: 391px) {
    display: none;
  }
`
const H3 = styled.h3`
  @media (max-width: 391px) {
    text-align: center;
    margin-top: 20px;
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: rgba(19, 71, 100, 1);
  }
`
