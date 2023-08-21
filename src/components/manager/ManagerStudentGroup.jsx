/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  managerDeleteStudentGroups,
  managerGetStudentGroups,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Button from '../UI/Button'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerStudentGroup = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [modal, setModal] = useState(null)
  const [dataId, setDataId] = useState(null)
  const { deleteStudentGroup, deleteStudentGroupStatus, managerStudentGroup } =
    useSelector((state) => state.manager)

  useEffect(() => {
    dispatch(managerGetStudentGroups({ id: +id }))
  }, [deleteStudentGroup])

  const modalOpen = (element) => {
    setModal(true)
    setDataId(element)
  }
  const modalClose = () => {
    setModal(false)
  }
  const handlerDeleteStudents = (element) => {
    dispatch(managerDeleteStudentGroups({ id: +element }))
    setModal(false)
  }
  const closeSnackBarHandler = () => {
    dispatch(
      managerAction.snackBarCloseStudentGroup({
        deleteStudentGroup: false,
        deleteStudentGroupStatus,
      })
    )
  }

  const handlerGroupBackNavigate = () => {
    navigate(-1)
  }

  return (
    <div>
      <CustomizedSnackbars
        message={
          deleteStudentGroupStatus === 'success'
            ? 'Поздравляем! Запрос на разрешения пользовотеля отправлен!'
            : deleteStudentGroupStatus === 'error'
            ? 'Произошло ошибка при заблокировании! Повторите попытку'
            : ''
        }
        variant={deleteStudentGroupStatus}
        open={deleteStudentGroup}
        closeSnackbar={closeSnackBarHandler}
      />
      <div>
        <div>
          <StyledTextDiv role='button' onClick={handlerGroupBackNavigate}>
            <H6>Все группы /</H6>
            <StyledH6>{managerStudentGroup?.group}</StyledH6>
          </StyledTextDiv>
        </div>
        <div>
          {managerStudentGroup.students.length > 0 ? (
            <Student
              variant='Manager_Group'
              variantClick='disbled'
              variantName='click'
              UserDataArray={managerStudentGroup?.students}
              onClickManagerDeleteButton={(element) => modalOpen(element.id)}
              onClickImgName={{}}
            />
          ) : (
            'Пока в этой группе нет студентов'
          )}
          {modal && (
            <Modall onClose={modalClose}>
              <StyledModallDiv>
                <StyledH2>
                  Вы дейтительно хотите удалить этого студента?
                </StyledH2>
                <StydetModallButtonDiv>
                  <Button variant='paid' onClick={modalClose}>
                    ОТМЕНА
                  </Button>
                  <Button
                    variant='not paid'
                    onClick={() => handlerDeleteStudents(dataId)}
                  >
                    УДАЛИТЬ
                  </Button>
                </StydetModallButtonDiv>
              </StyledModallDiv>
            </Modall>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManagerStudentGroup

const StyledTextDiv = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 26px;
`
const H6 = styled.h6`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(135, 135, 135, 1);
  margin-right: 10px;
`
const StyledH6 = styled.h6`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
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
