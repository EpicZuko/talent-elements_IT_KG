import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import Strelka from '../../assets/icon/notificationIcons/strelka.svg'
import {
  DeleteStaffGroups,
  GetStaffNotifications,
  NotDeleteStaffGroups,
  staffAdminAction,
} from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import Button from '../UI/Button'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'

const StaffAdminNotification = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteGroupId, setDeleteGroupId] = useState('')

  const { staffNotification, staffSnackBar, staffSnackBarStatus } = useSelector(
    (state) => state.staffAdmin
  )
  useEffect(() => {
    dispatch(GetStaffNotifications())
  }, [])
  const goBack = () => {
    navigate(-1)
  }
  const deleteModalHandlerClose = () => {
    setDeleteModal(false)
  }
  const deleteGroup = (groupId) => {
    dispatch(DeleteStaffGroups({ id: groupId }))
    setDeleteModal(false)
  }
  const deleteModalHandler = (id) => {
    setDeleteModal(true)
    setDeleteGroupId(id)
  }
  const notDeleteStaffAdmin = (id) => {
    dispatch(NotDeleteStaffGroups({ id }))
  }
  const closeSnackBarDelete = () => {
    dispatch(
      staffAdminAction.snackBarClose({
        staffSnackBar: false,
        staffSnackBarStatus,
      })
    )
  }
  return (
    <div>
      <CustomizedSnackbars
        variant={staffSnackBarStatus}
        open={staffSnackBar}
        message={
          staffSnackBarStatus === 'success'
            ? 'Ийгиликтүү өчүрүлдү 👍🏻'
            : 'Ийгиликсиз болду жаңыдан кайталаңыз. 😔'
        }
        closeSnackbar={closeSnackBarDelete}
      />
      {deleteModal && (
        <Modall onClose={deleteModalHandlerClose}>
          <StyledModallDiv>
            <StyledH2>Өчүрүүдө ишенимдүүсүзбү?</StyledH2>
            <StydetModallButtonDiv>
              <Button variant='paid' onClick={deleteModalHandlerClose}>
                Жок
              </Button>
              <Button
                variant='not paid'
                onClick={() => deleteGroup(deleteGroupId)}
              >
                Ооба
              </Button>
            </StydetModallButtonDiv>
          </StyledModallDiv>
        </Modall>
      )}
      <div>
        <Containern1>
          <TitleDiv onClick={goBack}>
            <img src={Strelka} alt='error strelka.svg' />
            <H5>Билдирүү</H5>
          </TitleDiv>
          <div>
            <StyledDivContainer>
              {staffNotification?.map((element) => (
                <div key={element.id}>
                  <Container>
                    <StyledGroupDiv>
                      <H6>{element.groupId}</H6>
                      <StyledDivGroup>
                        <H2>
                          {element.groupName}
                          <p>/Тайпасы</p>
                        </H2>
                      </StyledDivGroup>
                    </StyledGroupDiv>
                    <StyledDivMessage>
                      <StyeldMessage>{element.message}</StyeldMessage>
                    </StyledDivMessage>
                    <StyledDivButton>
                      <Button
                        variant='RequestAllow-Buttons'
                        onClick={() => notDeleteStaffAdmin(element.id)}
                      >
                        Уруксат Жок
                      </Button>
                      <Button
                        variant='RequestRefusal-Buttons'
                        onClick={() => deleteModalHandler(element.groupId)}
                      >
                        Уруксат берүү
                      </Button>
                    </StyledDivButton>
                  </Container>
                </div>
              ))}
            </StyledDivContainer>
          </div>
        </Containern1>
      </div>
    </div>
  )
}

export default StaffAdminNotification

const Containern1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  @media (max-width: 415px) {
    padding-left: 15px;
    padding-right: 0;
  }
`
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
const StyledDivContainer = styled.div`
  width: 100%;
  margin-top: 15px;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px #00000040;
  align-items: center;
  margin-top: 30px;
  padding: 5px;
  @media (max-width: 415px) {
    width: 360px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 10px;
  }
`
const StyledGroupDiv = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`
const StyledDivGroup = styled.div`
  width: 250px;
  margin-left: 10px;
`
const StyledDivMessage = styled.div`
  width: 350px;
  margin-left: 10px;
`
const StyledDivButton = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 415px) {
    gap: 30px;
  }
`
const H2 = styled.h2`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
`
const H6 = styled.h6`
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
`
const StyeldMessage = styled.p`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

const StyledH2 = styled.h2`
  font-family: Zen Kaku Gothic New;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
`
const StydetModallButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`
