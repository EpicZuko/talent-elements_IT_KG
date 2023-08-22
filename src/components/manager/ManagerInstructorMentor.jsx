/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  getAllManagerGroup,
  managerAddToGroupMetorInstructors,
  managerInstructorMentor,
  managerInstructorMentorPutUnBlockOrBlock,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import { SelectRole } from '../../utils/helpers/selected/selectRole'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Modall from '../UI/Modal'
import BasikSelect from '../UI/Select'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerInstructorMentor = () => {
  const [search, setSearch] = useState('')
  const [groupState, setGroupState] = useState(false)
  const [groupStudentName, setStudentName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [teacherId, setStudentId] = useState('')
  const [selectRole, setSelectRole] = useState(null)
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(managerInstructorMentor())
    dispatch(getAllManagerGroup())
  }, [])
  const {
    managerInstructorMentorSnackBar,
    SnackBarOpen,
    SnackBarStatus,
    getAllGroup,
  } = useSelector((state) => state.manager)
  const instructorBlockButton = (id) => {
    dispatch(managerInstructorMentorPutUnBlockOrBlock({ id, block: 'block' }))
  }
  const insturctorUnLockButton = (id) => {
    dispatch(managerInstructorMentorPutUnBlockOrBlock({ id, block: 'unblock' }))
  }
  const searchChangeValue = (event) => {
    setSearch(event.target.value)
  }
  const searchFilter = () => {
    const filterSearch = state?.managerInstructorMentorArray?.filter((elem) => {
      return elem?.name?.toLowerCase()?.includes(search)
    })
    return filterSearch
  }
  const filterSearch = searchFilter()

  const navigateInstructorMentorProfile = (id) => {
    navigate(`/instructorOrMentor/${id}`)
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
    dispatch(
      managerAddToGroupMetorInstructors({
        teacherRole: selectRole,
        teacherId: +teacherId,
        groupId: +groupId,
      })
    )
    setGroupState(false)
  }

  const closeSnackBarHandler = () => {
    dispatch(
      managerAction.snackBarCloseInstructorMentor({
        SnackBarOpen: false,
        SnackBarStatus,
      })
    )
  }
  return (
    <div>
      <CustomizedSnackbars
        message={
          managerInstructorMentorSnackBar.managerStatusBlock === 'success'
            ? 'Куттуктайбыз! Белгиленген колдонуучу ийгиликтүү кулпуланды 👍🏻'
            : managerInstructorMentorSnackBar.managerStatusUnBlock === 'success'
            ? 'Куттуктайбыз! Белгиленген колдонуучу ийгиликтүү кулпудан чыгарылды 👍🏻'
            : managerInstructorMentorSnackBar.status === 'error'
            ? 'Кечиресиз! Иш аракетте ката чыкты! Башынан кайталаңыз 😔'
            : ''
        }
        variant={managerInstructorMentorSnackBar.status}
        open={SnackBarOpen}
        closeSnackbar={closeSnackBarHandler}
      />
      <DivInput>
        <H6>Инструкторлор жана Менторлор</H6>
        <Input
          variant='add Search'
          placeholder='Издөө...'
          onChange={searchChangeValue}
          value={search}
        />
      </DivInput>
      {filterSearch.length > 0 ? (
        <Student
          variant='Instructors'
          UserDataArray={filterSearch}
          variantClick='disbled'
          onClickInstructorBlockButton={(element) =>
            instructorBlockButton(element.id)
          }
          onClickInstructorUnlockButton={(element) =>
            insturctorUnLockButton(element.id)
          }
          variantName='click'
          onClickImgName={(element) =>
            navigateInstructorMentorProfile(element.id)
          }
          onClickInstructorGroupButton={(element) => addGroupChange(element)}
        />
      ) : (
        <H3>Азырынча бул жер бош</H3>
      )}
      {groupState && (
        <Modall variant='' onClose={closeModalGroup}>
          <DivGroupStudentStyled>
            <H4>Тайпа кошуу</H4>
            <BasikSelect
              variant='standard'
              options={SelectRole}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.option}
              label='Кызматы'
              onChange={(event) => setSelectRole(event)}
            />
            <BasikSelect
              variant='standard'
              options={getAllGroup?.group}
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
    </div>
  )
}
export default ManagerInstructorMentor

const DivInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 950px;
  margin-bottom: 16px;
  @media (max-width: 391px) {
    display: flex;
    flex-direction: column;
    width: 360px;
  }
`
const H6 = styled.h6`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 19px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const H3 = styled.h3`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
