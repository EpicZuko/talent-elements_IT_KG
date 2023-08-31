import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { getSeoAdminProfile } from '../../services/reducerSlice/seoAdminGroupsSlice/allGroups'
import { LocalStorageFunction } from '../../utils/helpers/localeStorage/LocalStorageFunction'
import AvatarUsers from '../UI/AvatarUsers'

const SeoAdminProfile = () => {
  const state = useSelector((state) => state.seoAdmin)
  const [fileImg, setFileImg] = useState(state?.getProfile?.profileImg)
  const [format, setFormat] = useState('')
  const [editButton, setEditButton] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSeoAdminProfile({ fileImg: format }))
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
      <DivStyled>
        <AvatarUsers
          variant='User_admin'
          fileImg={state.getProfile.profileImg}
          setFormat={setFormat}
          setFileImg={setFileImg}
          editButtons={editButton}
          setEditButton={setEditButton}
          setDeleteButton={setDeleteButton}
          deleteButtons={deleteButton}
          user={state.getProfile.seoAdminProfile}
          logoutAccount={logout}
        />
      </DivStyled>
    </div>
  )
}
export default SeoAdminProfile

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
