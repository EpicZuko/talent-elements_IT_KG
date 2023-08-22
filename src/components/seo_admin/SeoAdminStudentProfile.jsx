import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStudentIDProfile } from '../../services/reducerSlice/seoAdminGroupsSlice/allGroups'
import AvatarUser from '../UI/AvatarUsers'
import TableSelect from '../UI/TableSelect'

const SeoAdminStudentProfile = () => {
  const navigate = useNavigate()
  const [, setFileImg] = useState('')
  const state = useSelector((state) => state.seoAdmin)
  const dispatch = useDispatch()
  const { studentProfile } = useParams()
  useEffect(() => {
    dispatch(getStudentIDProfile({ id: +studentProfile }))
  }, [studentProfile])

  const goBackHandler = () => {
    navigate(-1)
  }

  return (
    <div>
      <H6 onClick={goBackHandler}>
        {state?.studentIdProfileArray?.group} /
        <H5>{state.studentIdProfileArray.email}</H5>
      </H6>
      <StyledDivStudent>
        <AvatarUser
          variant='Visitor'
          profileImg={state?.studentIdProfileArray?.profileImg}
          setFileImg={setFileImg}
          user={state?.studentIdProfileArray?.groups}
        />
        <TableSelect
          variant='table'
          student={state?.studentIdProfileArray?.groups}
        />
      </StyledDivStudent>
    </div>
  )
}
export default SeoAdminStudentProfile

const StyledDivStudent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 396px;
  @media (max-width: 391px) {
    margin-left: 20px;
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
