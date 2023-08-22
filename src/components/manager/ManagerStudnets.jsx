import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  getAllManagerGroup,
  managerAddToStudents,
  managerBlockStudents,
  managerGetStudents,
  managerPutNotPaidStudents,
  managerPutPaidStudents,
  managerUnlockStudents,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Modall from '../UI/Modal'
import BasikSelect from '../UI/Select'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerStudnets = () => {
  const [groupState, setGroupState] = useState(false)
  const [groupStudentName, setStudentName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const state = useSelector((state) => state.manager)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(managerGetStudents())
    dispatch(getAllManagerGroup())
  }, [groupState, dispatch, studentId, groupId, groupStudentName])

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
    dispatch(managerPutNotPaidStudents({ id: buttonId.id }))
  }

  const handlerNotPaidButton = (elementId) => {
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

  const addGroupChange = (element) => {
    setGroupState(true)
    setStudentName(element)
    setStudentId(element.id)
  }

  const closeModalGroup = () => {
    setGroupState(false)
  }

  const clickAddGroupId = () => {
    dispatch(managerAddToStudents({ studentId, groupId }))
    setGroupState(false)
  }

  const snackbarCloseAddGroup = () => {
    dispatch(
      managerAction.snackBarCloseAddGroup({
        open: false,
        status: state?.getAllGroup?.statusAddGroups,
      })
    )
  }

  return (
    <div>
      <CustomizedSnackbars
        variant={state?.getAllGroup?.statusAddGroups}
        open={state?.getAllGroup?.open}
        closeSnackbar={snackbarCloseAddGroup}
        message={
          state.getAllGroup.statusAddGroups === 'success'
            ? 'Эң сонун! Бул колдонуучу эми тайпанын мүчөсү.👍🏻 '
            : 'Катышуучуну тайпага каттоодо катачылык кетти! Сураныч маалыматты тууралап кайрадан кошуңуз. 😔'
        }
        text=' '
      />
      {groupState && (
        <Modall variant='' onClose={closeModalGroup}>
          <DivGroupStudentStyled>
            <H4>Тайпага кошуу</H4>
            <BasikSelect
              variant='standard'
              options={state?.getAllGroup?.group}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.groupId}
              label='Тайпа'
              onChange={(event) => setGroupId(event)}
            />
            <h5>{groupStudentName.name}</h5>
            <Button variant='RequestAllow-Buttons' onClick={clickAddGroupId}>
              Кошуу
            </Button>
          </DivGroupStudentStyled>
        </Modall>
      )}
      <ContainerDiv>
        <ContainerDiv2>
          <div>
            <H5>Студенттер</H5>
          </div>
          <div>
            <Input
              onChange={searchChangeValue}
              variant='add Search'
              placeholder='Издөө...'
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
              onClickStudentGroupButton={(element) => addGroupChange(element)}
            />
          ) : (
            <h3>Азырынча бул жер бош</h3>
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
const DivGroupStudentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
  margin-top: 44px;
`
const H4 = styled.h4`
  color: var(--light-blue, #134764);
  text-align: center;
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
