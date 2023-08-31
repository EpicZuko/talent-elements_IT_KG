import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { profileStaffAdmin } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import { LocalStorageFunction } from '../../utils/helpers/localeStorage/LocalStorageFunction'
import AvatarUsers from '../UI/AvatarUsers'

const StaffAdminProfile = () => {
  const state = useSelector((state) => state.staffAdmin)
  const [, setFileImg] = useState(state?.profile?.profileImg)
  const [format, setFormat] = useState('')
  const [editButton, setEditButton] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileStaffAdmin({ file: format }))
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
      <DivStyled>
        <AvatarUsers
          variant='User_admin'
          setFormat={setFormat}
          fileImg={state.profile.profileImg}
          setFileImg={setFileImg}
          editButtons={editButton}
          setEditButton={setEditButton}
          setDeleteButton={setDeleteButton}
          deleteButtons={deleteButton}
          user={state?.profile?.groupProfile}
          logoutAccount={logout}
        />
      </DivStyled>
    </div>
  )
}
export default StaffAdminProfile

const DivStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1270px;
  margin-top: 19px;
  @media (max-width: 391px) {
    width: 390px;
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
