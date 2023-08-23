/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  managerStaffAdmin,
  managerStaffAdminPutBlockOrUnBlock,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerStaffAdmin = () => {
  const [modal, setModal] = useState(null)
  const [dataId, setDataId] = useState(null)
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
  const clickDeleteButton = (id) => {
    dispatch(managerStaffAdminPutBlockOrUnBlock({ id: +id, block: 'block' }))
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
        variant={state.statusStaffAdmin}
        open={state.managerStaffAdminOpen}
        closeSnackbar={closeSnackBarStaffAdmin}
        message={
          state.managerStaffAdminStatusBlock === 'success'
            ? 'Куттуктайбыз! Бул колдонуучу ийгиликтүү өчүрүлдү 👍'
            : state.statusStaffAdmin === 'error'
            ? 'Кечиресиз! Ката кетти! Башынан кайталаңыз 😔'
            : 'success'
        }
        text=''
      />
      <H5>STAFF Админ</H5>
      <Student
        variant='Manager_staff-admin'
        UserDataArray={state?.managerStaffAdmin}
        onClickManagerBlockButton={(element) => modalOpen(element.id)}
        variantClick='disbled'
      />
      {modal && (
        <Modall onClose={modalClose}>
          <StyledModallDiv>
            <StyledH2>Өчүрүүдө ишенимдүүсүзбү?</StyledH2>
            <StydetModallButtonDiv>
              <Button variant='paid' onClick={modalClose}>
                Жок
              </Button>
              <Button
                variant='not paid'
                onClick={() => clickDeleteButton(dataId)}
              >
                Ооба
              </Button>
            </StydetModallButtonDiv>
          </StyledModallDiv>
        </Modall>
      )}
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
