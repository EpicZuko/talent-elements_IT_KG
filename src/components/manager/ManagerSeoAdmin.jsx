/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  getManagerSeoAdmin,
  managerSeoAdminBlockOrUnBlock,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerSeoAdmin = () => {
  const [modal, setModal] = useState(null)
  const [dataId, setDataId] = useState(null)
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
  const clickDeleteButton = (id) => {
    dispatch(managerSeoAdminBlockOrUnBlock({ id: +id, block: 'delete' }))
    setModal(false)
  }
  const modalOpen = (element) => {
    setModal(true)
    setDataId(element)
  }
  const modalClose = () => {
    setModal(false)
  }

  return (
    <div>
      <CustomizedSnackbars
        variant={state.managerSeoAdmin.seoAdminStatus}
        open={state.managerSeoAdmin.open}
        closeSnackbar={closeSnackBarSeoAdmin}
        message={
          state.managerSeoAdmin.statusBlock === 'success'
            ? 'Поздравляем!  Данный  пользователь  успешно  Удалено!'
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
        onClickManagerBlockButton={(element) => modalOpen(element.id)}
        variantClick='disbled'
      />
      {modal && (
        <Modall onClose={modalClose}>
          <StyledModallDiv>
            <StyledH2>Вы дейтительно хотите удалить?</StyledH2>
            <StydetModallButtonDiv>
              <Button variant='paid' onClick={modalClose}>
                ОТМЕНА
              </Button>
              <Button
                variant='not paid'
                onClick={() => clickDeleteButton(dataId)}
              >
                УДАЛИТЬ
              </Button>
            </StydetModallButtonDiv>
          </StyledModallDiv>
        </Modall>
      )}
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
const StyledH2 = styled.h2`
  font-family: Zen Kaku Gothic New;
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
