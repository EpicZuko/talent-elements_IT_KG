import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { managerInstructorMentorProfile } from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import AvatarUsers from '../UI/AvatarUsers'
import Table from '../UI/TableSelect'

const ManagerInstructorMentorProfile = () => {
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { insturctorMentorProfileId } = useParams()

  useEffect(() => {
    dispatch(managerInstructorMentorProfile({ id: +insturctorMentorProfileId }))
  }, [insturctorMentorProfileId])

  const goBackInstructorMentor = () => {
    navigate(-1)
  }

  return (
    <div>
      <H6 onClick={goBackInstructorMentor}>
        Инструктор жана Ментор /<H5>{state?.instructorMentorProfile?.email}</H5>
      </H6>
      <DivStyled>
        <AvatarUsers
          variant='manager_group'
          profileImg={state?.instructorMentorProfile?.profileImg}
          user={state?.instructorMentorProfile?.lessonNames}
        />
        <Table
          student={state?.instructorMentorProfile?.tableNames}
          variant='select'
        />
      </DivStyled>
    </div>
  )
}
export default ManagerInstructorMentorProfile

const DivStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const H6 = styled.h6`
  display: flex;
  color: var(--breadcrumbs, #878787);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 26px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const H5 = styled.h5`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
