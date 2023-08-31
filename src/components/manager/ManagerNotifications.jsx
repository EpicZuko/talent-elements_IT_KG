/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import Strelka from '../../assets/icon/notificationIcons/strelka.svg'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  managerBlockUser,
  managerGetNotifications,
  managerPostNotificationSelect,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import { selectArray } from '../../utils/helpers/selected/select'
import Notifications from '../UI/Notifications'
import CustomizedSnackbars from '../UI/Snackbar'

const ManagerNotifications = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectstate, setSelectState] = useState(null)
  const [selectIndex, setSelectIndex] = useState('')
  const state = useSelector((state) => state.manager)

  const { headerNotificationStatus, headerNotification, statusblock } =
    useSelector((state) => state.manager)

  const closeSnackBarHandler = () => {
    dispatch(
      managerAction.snackBarCloseHeaderNotification({
        headerNotification: false,
        headerNotificationStatus,
      })
    )
  }

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(managerGetNotifications())
  }, [dispatch])
  const postSelected = (element) => {
    dispatch(
      managerPostNotificationSelect({
        body: {
          id: element.number,
          roleRequest: selectstate,
        },
      })
    )
  }
  const handlerBlockUser = (element) => {
    dispatch(managerBlockUser({ id: element.number }))
  }
  console.log(state)
  return (
    <div>
      <CustomizedSnackbars
        message={
          // eslint-disable-next-line no-nested-ternary
          headerNotificationStatus === 'success'
            ? 'Куттуктайбыз! Колдонуучуга уруксат берилди 👍🏻'
            : statusblock === 'success'
            ? 'Куттуктайбыз!!! Белгиленген колдонуучу ийгиликтүү кулпуланды 👍🏻'
            : statusblock === 'error'
            ? 'Кулпулоодо ката кетти! Башынан кайталаңыз 😔'
            : 'Кечиресиз уруксат берүүдө ката кетти! Сураныч киргизилген маалыматты тактап башынан киргизиңиз 😔'
        }
        variant={headerNotificationStatus || statusblock}
        open={headerNotification}
        closeSnackbar={closeSnackBarHandler}
      />
      <div>
        <div>
          <TitleDiv onClick={goBack}>
            <img src={Strelka} alt='error strelka.svg' />
            <H5>Билдирүү</H5>
          </TitleDiv>
        </div>
        <StyledDiv>
          {state?.managerNotifications.map((element, i) => (
            <div key={element.id}>
              <Notifications
                index={i}
                selectArray={selectArray}
                selectstate={selectstate}
                selectIndex={selectIndex}
                setSelectIndex={setSelectIndex}
                setSelectState={setSelectState}
                variant='ManagerNotifications'
                handlerAllowAccess={(element) => postSelected(element)}
                handlerBlockUser={(element) => handlerBlockUser(element)}
                managerData={element}
              />
            </div>
          ))}
          {state?.managerNotifications.length === 0 && (
            <StyledDivv>
              <H5>Азырынча сизде билдирүү жок</H5>
            </StyledDivv>
          )}
        </StyledDiv>
      </div>
    </div>
  )
}

export default ManagerNotifications

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
`
const H5 = styled.h5`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
  margin-left: 10px;
`
const StyledDiv = styled.div`
  width: 100%;
  padding: 35px;
`
const StyledDivv = styled.div`
  width: 100%;
  text-align: center;
`
