import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { getRatingGroupById } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import Student from '../UI/Student'

const StaffAdminStudents = () => {
  const state = useSelector((state) => state.staffAdmin)
  const { student } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getRatingGroupById({ id: +student }))
  }, [student])

  const goBackGroup = () => {
    navigate(-1)
  }
  return (
    <DivBlockContainer>
      <div>
        <AllGroups onClick={goBackGroup}>
          Тайпалар /
          <StudensJava5>{state?.getStudentIdRainting?.groupName}</StudensJava5>
        </AllGroups>
      </div>
      <StudentContianer>
        <Student
          variant='User_Group'
          UserDataArray={state?.getStudentIdRainting?.getGroupBiId}
          variantClick='disbled'
        />
      </StudentContianer>
    </DivBlockContainer>
  )
}

export default StaffAdminStudents
const DivBlockContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 391px) {
  }
`
const StudentContianer = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  @media (max-width: 391px) {
    margin-left: 10px;
    width: 300px;
  }
`

const StudensJava5 = styled.h6`
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  color: rgba(19, 71, 100, 1);
  margin-left: 5px;
  @media screen and (max-width: 391px) {
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    margin-left: 5px;
  }
`
const AllGroups = styled.h6`
  width: 400px;
  margin-top: 40px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(135, 135, 135, 1);
  @media screen and (max-width: 391px) {
    width: 300px;
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    margin-left: 11px;
  }
`
