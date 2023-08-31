import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { managerProfileGet } from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import { LocalStorageFunction } from '../../utils/helpers/localeStorage/LocalStorageFunction'
import AvatarUsers from '../UI/AvatarUsers'

const ManagerProfile = () => {
  const [, setFileImg] = useState('')
  const [deleteButton, setDeleteButton] = useState(false)
  const [editButton, setEditButton] = useState(false)
  const [format, setFormat] = useState('')
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(managerProfileGet({ file: format }))
  }, [format])
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
          setFormat={setFormat}
          profileImg={state.managerProfileGet.profileImg}
          fileImg={state.managerProfileGet.profileImg}
          setFileImg={setFileImg}
          deleteButtons={deleteButton}
          editButtons={editButton}
          setDeleteButton={setDeleteButton}
          setEditButton={setEditButton}
          user={state.managerProfileGet.profile}
          logoutAccount={logout}
        />
      </StyledDivStudent>
    </div>
  )
}
export default ManagerProfile

const StyledDivStudent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
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
  @media (max-width: 391px) {
    font-size: 16px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
`
