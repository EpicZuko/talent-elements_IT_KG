import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStudentSubmissionById } from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import HomeWorkTask from '../UI/HomeWorkTask'

export const MentorInstructorSubmissions = () => {
  const state = SelectorFuncMentor()
  const [task, setTask] = useState(null)
  const { studentName, assignmentId, submissionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getStudentSubmissionById({
        assignmentId,
        submissionId,
      })
    )
  }, [])
  const navToLesosn = () => {
    navigate(-1)
  }
  return (
    <div>
      <Location>
        <LocationText onClick={navToLesosn}>Сабактар /</LocationText>
        <LocationText2>{studentName}</LocationText2>
      </Location>
      <HomeWorkTask
        variant='admin'
        setTaskN1={setTask}
        taskN1={task}
        Tasks={state?.getStudentSubmission?.homeWork || []}
        OnswerHomeWork={state?.getStudentSubmission?.answer || []}
      />
    </div>
  )
}

const Location = styled.div`
  margin-bottom: 26px;
  display: flex;
  gap: 5px;
`
const LocationText = styled.p`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(135, 135, 135, 1);
  cursor: pointer;
`
const LocationText2 = styled.p`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(19, 71, 100, 1);
`
