import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrowLeft from '../../assets/icon/notificationIcons/strelka.svg'
import { getMentorProfile } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import { LocalStorageFunction } from '../../utils/helpers/localeStorage/LocalStorageFunction'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import AvatarUsers from '../UI/AvatarUsers'

export const MentorInstrcutorProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navToPrevPage = () => {
    navigate(-1)
  }
  const state = SelectorFuncMentor()
  const [fileImg, setFileImg] = useState('')
  const [format, setFormat] = useState('')
  const [editButton, setEditButton] = useState(false)
  useEffect(() => {
    dispatch(getMentorProfile({ img: format }))
  }, [format])
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
      <Location>
        <img
          style={{ cursor: 'pointer' }}
          src={arrowLeft}
          alt='none'
          onClick={navToPrevPage}
        />
        <H5>Жеке бөлмө</H5>
      </Location>
      <StyledDivStudent>
        <AvatarUsers
          variant='User_admin'
          user={[state.getMyProfile]}
          fileImg={fileImg || state.getMyProfile.avatarImg}
          setFileImg={setFileImg}
          setDeleteButton={() => {}}
          setFormat={setFormat}
          setEditButton={setEditButton}
          editButtons={editButton}
          logoutAccount={logout}
        />
      </StyledDivStudent>
    </div>
  )
}

const StyledDivStudent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin-top: 40px;
  @media (max-width: 415px) {
    margin-top: 60px;
    width: 100%;
    margin-left: 5px;
  }
`
const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 415px) {
    font-size: 16px;
  }
`
