/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import {
  deleteGroupManager,
  managerGetAllGroups,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Card from '../UI/card/Card'
import Input from '../UI/Input'
import Modall from '../UI/Modal'

const ManagerGroup = () => {
  const [search, setSearch] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteGroupId, setDeleteGroupId] = useState('')
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(managerGetAllGroups())
  }, [deleteGroupId])
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

  const deleteGroup = (groupId) => {
    dispatch(deleteGroupManager({ id: groupId }))
    setDeleteModal(false)
  }
  const deleteModalHandler = (id) => {
    setDeleteModal(true)
    setDeleteGroupId(id)
  }
  const deleteModalHandlerClose = () => {
    setDeleteModal(false)
  }

  const navigateCreatedGroup = () => {
    navigate('/createdGroup')
  }
  const handlerManagerStudentGroup = (element) => {
    navigate(`/${element.id}`)
  }
  return (
    <div>
      {deleteModal && (
        <Modall onClose={deleteModalHandlerClose}>
          <StyledModallDiv>
            <StyledH2>Өчүрүүдө ишенимдүүсүзбү?</StyledH2>
            <StydetModallButtonDiv>
              <Button variant='paid' onClick={deleteModalHandlerClose}>
                Жок
              </Button>
              <Button
                variant='not paid'
                onClick={() => deleteGroup(deleteGroupId)}
              >
                Ооба
              </Button>
            </StydetModallButtonDiv>
          </StyledModallDiv>
        </Modall>
      )}
      <ContainerDiv1>
        <div>
          <TitleH5>Тайпалар</TitleH5>
        </div>
        <ContainerDiv2>
          <StyledDivInput>
            <Input
              variant='adds-search'
              placeholder='Поиск...'
              onChange={searchChangeValue}
            />
          </StyledDivInput>
          <Button variant='create group' onClick={navigateCreatedGroup}>
            <StyledSpan>Тайпа түзүү</StyledSpan>
          </Button>
        </ContainerDiv2>
      </ContainerDiv1>
      {state.managerCard.length === 0 ? (
        <H3>Азырынча тайпа жок</H3>
      ) : filterSearch.length ? (
        <Card
          user={filterSearch}
          variantClick='click'
          navToCurrentGroup={(element) => handlerManagerStudentGroup(element)}
          navToStudents={(element) => handlerManagerStudentGroup(element)}
          variant='Manager_group'
          onClickDeleteGroup={(element) => deleteModalHandler(element.id)}
          variantDelete='delete'
        />
      ) : (
        <H3>Табылган жок</H3>
      )}
    </div>
  )
}

export default ManagerGroup

const TitleH5 = styled.h5`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
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
  width: 92%;
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
    font-family:
      Zen Kaku Gothic New,
      sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: rgba(19, 71, 100, 1);
  }
`

const StyledH2 = styled.h2`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
`
const StyledModallDiv = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`
const StydetModallButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`
