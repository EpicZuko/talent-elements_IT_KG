import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import { managerCreatedGroup } from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Profile from '../UI/Profile'
import CustomizedSnackbars from '../UI/Snackbar'

const ManagerCreatedGroup = () => {
  const [files, setFiles] = useState('')
  const [format, setFormat] = useState('')
  const [name, setName] = useState('')
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navigateGoBackGroup = () => {
    navigate(-1)
  }
  const groupNameChange = (event) => {
    setName(event.target.value)
  }
  const closeSnackBar = () => {
    dispatch(
      managerAction.snackBarCloseCreatedGroup({
        open: false,
        status: state.managerCreatedGroupStatus,
      })
    )
  }
  const postCreatedGroup = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', format)
    if (name.length > 0) {
      dispatch(
        managerCreatedGroup({
          body: {
            name,
            file: format,
          },
        })
      )
      setFiles('')
      setName('')
    }
  }
  return (
    <div>
      <CustomizedSnackbars
        variant={state.managerCreatedGroupStatus}
        open={state?.snackBarCreatedGroup?.open}
        closeSnackbar={closeSnackBar}
        message={
          state.managerCreatedGroupStatus === 'success'
            ? 'Отлично! Ваша группа успешно создана желаем вам удачи'
            : 'Ошибка при создании группы. Пожалуйста, попробуйте ещё раз'
        }
      />
      <form onSubmit={postCreatedGroup}>
        <H6 onClick={navigateGoBackGroup}>
          Все группы /<H5> Создать группу</H5>
        </H6>
        <Div>
          <Profile files={files} setFiles={setFiles} setFormat={setFormat} />
          <Input
            variant='create-group'
            placeholder='Название группы'
            onChange={groupNameChange}
            value={name}
          />
          <Button variant='create group-page'>Создать группу</Button>
        </Div>
      </form>
    </div>
  )
}
export default ManagerCreatedGroup

const H6 = styled.h6`
  display: flex;
  color: var(--breadcrumbs, #878787);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin-top: 90px;
  height: 500px;
  @media (max-width: 391px) {
    height: 340px;
    margin-top: 50px;
  }
`
