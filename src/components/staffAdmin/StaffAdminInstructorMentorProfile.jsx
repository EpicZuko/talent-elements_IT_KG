import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getProfileInstructorMentor } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import AvatarUsers from '../UI/AvatarUsers'
import Table from '../UI/TableSelect'

const StaffAdminInstructorMentorProfile = () => {
  const [, setFileImg] = useState('')
  const state = useSelector((state) => state.staffAdmin)
  const dispatch = useDispatch()
  const { instructorMentorProfileID } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getProfileInstructorMentor({ id: +instructorMentorProfileID }))
  }, [instructorMentorProfileID])

  const profileInstructorMentor = () => {
    const arrayProfile = []
    arrayProfile.push({
      id: state?.getProfileInstructorMentor?.profileInstructorOrMentor?.id,
      name: state?.getProfileInstructorMentor?.profileInstructorOrMentor?.name,
      email:
        state?.getProfileInstructorMentor?.profileInstructorOrMentor?.email,
    })
    return arrayProfile
  }

  const profileInstructor = profileInstructorMentor()

  const goBackInstructorMentor = () => {
    navigate(-1)
  }

  return (
    <div>
      <H6 onClick={goBackInstructorMentor}>
        Инструкторлор жана Менторлор /
        <H5>
          {state?.getProfileInstructorMentor?.profileInstructorOrMentor?.email}
        </H5>
      </H6>
      <StyledDivStudent>
        <AvatarUsers
          variant='Visitor'
          profileImg={
            state?.getProfileInstructorMentor?.profileInstructorOrMentor
              ?.profileImg ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
          }
          setFileImg={setFileImg}
          user={profileInstructor}
        />
        <Table
          variant='select'
          student={state?.getProfileInstructorMentor?.lesson}
        />
      </StyledDivStudent>
    </div>
  )
}
export default StaffAdminInstructorMentorProfile

const StyledDivStudent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 396px;
  @media (max-width: 391px) {
    margin-left: 3px;
    margin-top: 23px;
  }
`
const H6 = styled.h6`
  color: var(--breadcrumbs, #878787);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  padding-left: 35px;
  padding-top: 35px;
  @media (max-width: 391px) {
    font-size: 16px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 23px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-left: 5px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
