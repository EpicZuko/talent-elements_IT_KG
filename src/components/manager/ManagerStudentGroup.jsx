/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { managerAction } from '../../services/reducerSlice/manager/managerAction/managerAction'
import {
  managerDeleteStudentGroups,
  managerGetStudentGroups,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import CustomizedSnackbars from '../UI/Snackbar'
import Student from '../UI/Student'

const ManagerStudentGroup = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const { deleteStudentGroup, deleteStudentGroupStatus, managerStudentGroup } =
    useSelector((state) => state.manager)

  useEffect(() => {
    dispatch(managerGetStudentGroups({ id: +id }))
  }, [deleteStudentGroup])

  const handlerDeleteStudents = (element) => {
    dispatch(managerDeleteStudentGroups({ id: +element }))
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
              onClickManagerDeleteButton={(element) =>
                handlerDeleteStudents(element.id)
              }
              onClickImgName={{}}
            />
          ) : (
            'Пока в этой группе нет студентов'
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
