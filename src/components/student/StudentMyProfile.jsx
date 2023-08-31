import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getStudentMyProfile } from '../../services/reducerSlice/studentSlice/studentAction'
import { LocalStorageFunction } from '../../utils/helpers/localeStorage/LocalStorageFunction'
import AvatarUsers from '../UI/AvatarUsers'
import { Progress } from '../UI/ProgressBar'

const StudentMyProfile = () => {
  const state = useSelector((state) => state.student)
  const [fileImg, setFileImg] = useState(state?.getStudentMyProfile?.profileImg)
  const [format, setFormat] = useState('')
  const [deleteButton, setDeleteButton] = useState(false)
  const [editButton, setEditButton] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentMyProfile({ fileImg: format }))
  }, [fileImg, format])
  const navigate = useNavigate()

  const logout = () => {
    LocalStorageFunction({
      type: 'removeItem',
      key: 'login',
    })
    navigate('/')
    window.location.reload()
  }
  return (
    <div>
      <H5>Жеке бөлмө</H5>
      <StyledDivStudent>
        <AvatarUsers
          variant='User_admin'
          fileImg={state?.getStudentMyProfile?.profileImg}
          setFileImg={setFileImg}
          setFormat={setFormat}
          deleteButtons={deleteButton}
          editButtons={editButton}
          setDeleteButton={setDeleteButton}
          setEditButton={setEditButton}
          user={state?.getStudentMyProfile?.studentMyProfile}
          logoutAccount={logout}
        />
        <DivProgress>
          <H4>Прогресс</H4>
          <Progress
            variant='successful'
            percent={state?.getStudentMyProfile?.completedCount}
          />
          <Progress
            variant='inProgress'
            percent={state?.getStudentMyProfile?.inProgressCount}
          />
          <Progress
            variant='notStarted'
            percent={state?.getStudentMyProfile?.notStartedCount}
          />
        </DivProgress>
      </StyledDivStudent>
    </div>
  )
}
export default StudentMyProfile

const StyledDivStudent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 396px;
  @media (max-width: 391px) {
    margin-left: 0px;
    margin-top: 23px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-left: 35px;
  padding-top: 35px;
  @media (max-width: 391px) {
    font-size: 16px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
`

const DivProgress = styled.div`
  @media (max-width: 391px) {
    padding-left: 30px;
  }
`
const H4 = styled.h4`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 391px) {
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
  }
`
