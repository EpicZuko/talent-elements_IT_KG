import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { managerStudentProfile } from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import AvatarUsers from '../UI/AvatarUsers'
import Table from '../UI/TableSelect'

const ManagerStudentProfile = () => {
  const state = useSelector((state) => state.manager)
  const { studentId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(managerStudentProfile({ studentId: +studentId }))
  }, [studentId])
  const groupGoBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <H6 onClick={groupGoBack}>
        Тайпа / <H5>{state?.managerStudentProfile?.email}</H5>
      </H6>
      <DivStyled>
        <AvatarUsers
          variant='manager_group'
          profileImg={state?.managerStudentProfile?.profileImg}
          user={
            state?.managerStudentProfile?.studentProfileArray.length > 0
              ? state?.managerStudentProfile?.studentProfileArray
              : []
          }
        />
        <Table
          student={
            state?.managerStudentProfile?.studentProfileRegister.length > 0
              ? state?.managerStudentProfile?.studentProfileRegister
              : []
          }
          variant='table'
        />
      </DivStyled>
    </div>
  )
}
export default ManagerStudentProfile

const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
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
