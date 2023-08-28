import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getStudentLesson } from '../../services/reducerSlice/studentSlice/studentAction'
import Lessons from '../UI/Lessons'

const StudentLesson = () => {
  const state = useSelector((state) => state.student)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getStudentLesson())
  }, [])

  const navigateHomeWork = (id) => {
    navigate(`/lesson/${id}`)
  }

  const goBackGroup = () => {
    navigate(-1)
  }

  return (
    <DivLesson>
      <H6 onClick={goBackGroup}>Сабактар</H6>
      {state?.getStudentLessonsArray?.studentLesson.length > 0 ? (
        state?.getStudentLessonsArray?.studentLesson.map((item) => (
          <Lessons
            key={item.title}
            variant='User'
            element={{
              count: item.count,
              text: item.title,
              title: item.titleYoutube,
              urlLesson: item.youtube,
              explain: item.titleFile,
              urlPdf: item.file,
              lessons: item.lessons,
              assignments: item.assignments,
              submissionResponseList: item.submissionResponseList,
            }}
            chageExplain={(element) => navigateHomeWork(element.id)}
          />
        ))
      ) : (
        <H4>Бул жер азырынча бош</H4>
      )}
    </DivLesson>
  )
}
export default StudentLesson

const DivLesson = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 0px;
  }
`
const H6 = styled.h6`
  color: var(--breadcrumbs, #878787);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 35px;
  margin-bottom: 43px;
  display: flex;
  @media (max-width: 391px) {
    margin-left: 10px;
    margin-bottom: 17px;
    margin-top: 15px;
    font-size: 16px;
  }
`

const H4 = styled.h4`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 50px;
  @media (max-width: 391px) {
    font-size: 14px;
    color: var(--breadcrumbs, #878787);
    margin-left: 30px;
  }
`
