import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStudentProfileProgress } from '../../services/reducerSlice/studentSlice/studentAction'
import AvatarUsers from '../UI/AvatarUsers'
import { Progress } from '../UI/ProgressBar'

const StudentProfile = () => {
  const [, setFileImg] = useState('')
  const state = useSelector((state) => state.student)
  const dispatch = useDispatch()
  const { studentId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getStudentProfileProgress({ id: +studentId }))
  }, [studentId])

  const goBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <H6 onClick={goBack}>
        Тайпа /<H5>{state?.getStudentProfileProgress?.email}</H5>
      </H6>
      <StyledDivStudent>
        <AvatarUsers
          variant='Visitor'
          profileImg={state?.getStudentProfileProgress?.profileImg}
          setFileImg={setFileImg}
          user={state?.getStudentProfileProgress?.studentProfileProgress}
        />
        <DivProgress>
          <H4>Прогресс</H4>
          <Progress
            variant='successful'
            percent={state?.getStudentProfileProgress?.completedCount}
          />
          <Progress
            variant='inProgress'
            percent={state?.getStudentProfileProgress?.inProgressCount}
          />
          <Progress
            variant='notStarted'
            percent={state?.getStudentProfileProgress?.notStartedCount}
          />
        </DivProgress>
      </StyledDivStudent>
    </div>
  )
}
export default StudentProfile

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
