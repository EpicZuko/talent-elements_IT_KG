/* eslint-disable no-nested-ternary */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  getManagerSeoAdmin,
  managerSeoAdminBlockOrUnBlock,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerSeoAdmin = () => {
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getManagerSeoAdmin())
  }, [])

  const closeSnackBarSeoAdmin = () => {
    dispatch(
      managerAction.snackBarCloseSeoAdmin({
        open: false,
        status: state.managerSeoAdmin.seoAdminStatus,
      })
    )
  }
  const clickBlockButton = (id) => {
    dispatch(managerSeoAdminBlockOrUnBlock({ id, block: 'block' }))
  }
  const clickUnBlockButton = (id) => {
    dispatch(managerSeoAdminBlockOrUnBlock({ id, block: 'unblock' }))
  }
  return (
    <div>
      <CustomizedSnackbars
        variant={state.managerSeoAdmin.seoAdminStatus}
        open={state.managerSeoAdmin.open}
        closeSnackbar={closeSnackBarSeoAdmin}
        message={
          state.managerSeoAdmin.statusBlock === 'success'
            ? 'Поздравляем!  Данный  пользователь  успешно  заблокировано!'
            : state.managerSeoAdmin.statusUnBlock === 'success'
            ? 'Поздравляем!  Данный  пользователь  успешно  разблокировано'
            : state.managerSeoAdmin.seoAdminStatus === 'error'
            ? 'Извините ! Произошло ошибка при запросе! Повторите попытку'
            : 'success'
        }
        text=' '
      />
      <H5>Seo админ</H5>
      <Student
        variant='Manager_staff-admin'
        UserDataArray={state.managerSeoAdmin.seoAdmin}
        onClickManagerBlockButton={(element) => clickBlockButton(element.id)}
        onClickManagerUnlockButton={(element) => clickUnBlockButton(element.id)}
        variantClick='disbled'
      />
    </div>
  )
}
export default ManagerSeoAdmin

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
