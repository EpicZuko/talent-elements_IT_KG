import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getSeoAdminByIdTeachers } from '../../services/reducerSlice/seoAdminGroupsSlice/allGroups'
import AvatarUsers from '../UI/AvatarUsers'
import Table from '../UI/TableSelect'

const SeoAdminInstructorMentorProfile = () => {
  const navigate = useNavigate()
  const [, setFileImg] = useState('')
  const state = useSelector((state) => state.seoAdmin)
  const dispatch = useDispatch()
  const { instructorId } = useParams()

  useEffect(() => {
    dispatch(getSeoAdminByIdTeachers({ id: +instructorId }))
  }, [instructorId])

  const lessonChange = () => {
    const lessons = []

    state.byIdTeachers.lessonNames.forEach((group) => {
      group.lessonTipResponses.forEach((lesson) => {
        const lessonNames = lesson.lessonName
        lessons.push({
          id: group.groupId,
          number: group.groupId,
          groups: group.groupName,
          lessons: lessonNames,
        })
      })
    })
    return lessons
  }

  const lessons = lessonChange()

  const goBackHandler = () => {
    navigate(-1)
  }

  return (
    <div>
      <H6 onClick={goBackHandler}>
        Инструкторлор жана Менторлор /<H5>{state?.byIdTeachers?.email}</H5>
      </H6>
      <StyledDivStudent>
        <AvatarUsers
          variant='Visitor'
          profileImg={state?.byIdTeachers?.profileImg}
          setFileImg={setFileImg}
          user={state?.byIdTeachers?.groups}
        />
        <Table variant='select' student={lessons} />
      </StyledDivStudent>
    </div>
  )
}
export default SeoAdminInstructorMentorProfile

const StyledDivStudent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 396px;
  @media (max-width: 391px) {
    margin-left: 10px;
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
