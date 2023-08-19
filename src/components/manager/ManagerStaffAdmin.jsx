/* eslint-disable no-nested-ternary */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  managerStaffAdmin,
  managerStaffAdminPutBlockOrUnBlock,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerStaffAdmin = () => {
  const state = useSelector((state) => state.manager)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(managerStaffAdmin())
  }, [])

  const closeSnackBarStaffAdmin = () => {
    dispatch(
      managerAction.snackBarCloseStaffAdmin({
        open: false,
        status: state.statusStaffAdmin,
      })
    )
  }
  const clickBlockButton = (id) => {
    dispatch(managerStaffAdminPutBlockOrUnBlock({ id, block: 'block' }))
  }

  const clickUnBlockButton = (id) => {
    dispatch(managerStaffAdminPutBlockOrUnBlock({ id, block: 'unblock' }))
  }
  return (
    <div>
      <CustomizedSnackbars
        variant={state.statusStaffAdmin}
        open={state.managerStaffAdminOpen}
        closeSnackbar={closeSnackBarStaffAdmin}
        message={
          state.managerStaffAdminStatusBlock === 'success'
            ? 'Поздравляем!  Данный  пользователь  успешно  заблокировано!'
            : state.managerStaffAdminStatusUnBlock === 'success'
            ? 'Поздравляем!  Данный  пользователь  успешно  разблокировано'
            : state.statusStaffAdmin === 'error'
            ? 'Извините ! Произошло ошибка при запросе! Повторите попытку'
            : 'success'
        }
        text=''
      />
      <H5>Staff админ</H5>
      <Student
        variant='Manager_staff-admin'
        UserDataArray={state?.managerStaffAdmin}
        onClickManagerBlockButton={(element) => clickBlockButton(element.id)}
        onClickManagerUnlockButton={(element) => clickUnBlockButton(element.id)}
        variantClick='disbled'
      />
    </div>
  )
}
export default ManagerStaffAdmin

const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 19px;
  @media (max-width: 391px) {
    font-size: 16px;
    margin-bottom: 17px;
  }
`
