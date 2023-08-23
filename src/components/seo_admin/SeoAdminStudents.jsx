import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStudentsId } from '../../services/reducerSlice/seoAdminGroupsSlice/allGroups'
import Student from '../UI/Student'

const SeoAdminStudent = () => {
  const state = useSelector((state) => state.seoAdmin)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getStudentsId({ id: +id }))
  }, [id])
  const studentIdOrProfile = (studentId) => {
    navigate(`/studentProfile/${studentId}`)
  }

  const goBackHandler = () => {
    navigate(-1)
  }

  return (
    <div>
      <DivContianer>
        <DivStyle>
          <AllGroup onClick={goBackHandler}>Тайпалар</AllGroup>
        </DivStyle>
        <DivStudent>
          <Student
            UserDataArray={state?.students}
            variant='Seo_admin_group'
            onClickElement={(element) => studentIdOrProfile(element.id)}
          />
        </DivStudent>
      </DivContianer>
    </div>
  )
}
export default SeoAdminStudent
const AllGroup = styled.h6`
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(135, 135, 135, 1);
  display: flex;
  align-items: center;
  width: 300px;
  height: 29px;
  flex-shrink: 0;
  @media (max-width: 391px) {
    color: var(--breadcrumbs, #878787);
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-left: 20px;
  }
`

const DivContianer = styled.div`
  margin-top: 50px;
  margin-left: 30px;
  align-items: center;
  @media (max-width: 391px) {
    margin-top: 10px;
    margin-left: 0px;
  }
`
const DivStyle = styled.div`
  display: flex;
  padding-bottom: 15px;
  @media (max-width: 391px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    width: 370px;
  }
`
const DivStudent = styled.div`
  @media (max-width: 391px) {
    width: 370px;
    overflow-x: scroll;
    margin-left: 20px;
  }
`
