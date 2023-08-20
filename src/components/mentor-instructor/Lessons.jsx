import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  getMentorLessons,
  getMentorVotedStudentsByAssignmentId,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Button from '../UI/Button'
import Lessons from '../UI/Lessons'

const MentorInstructorLessons = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = SelectorFuncMentor()

  const { groupName, groupId } = useParams()

  useEffect(() => {
    dispatch(
      getMentorLessons({
        groupId,
      })
    )
  }, [])
  const navToCourse = () => {
    navigate('/')
  }
  const getVotedStudents = (element) => {
    dispatch(getMentorVotedStudentsByAssignmentId({ id: element.assignmentId }))
  }
  const createLesson = () => {
    navigate('create-lesson')
  }

  const navigateToHomeWorkPage = (element) => {
    navigate(`homework/${element.username}/${element.studentId}`)
  }
  const navigateToEditLessonPage = (element) => {
    navigate(`edit_lesson/${element.id}/${element.materialId}`)
  }
  return (
    <div>
      <Block>
        <Location>
          <LocationText onClick={navToCourse}>{groupName} /</LocationText>
          <LocationText2>Уроки</LocationText2>
        </Location>
        <ButtonsBlock>
          <Button onClick={createLesson} variant='Add-Button'>
            +
          </Button>
        </ButtonsBlock>
        <ButtonsBlock2>
          <Button onClick={createLesson} variant='create group'>
            Ввести урок
          </Button>
        </ButtonsBlock2>
      </Block>
      <LessonsBlock>
        {state.getLessons?.lesson?.map((elem) =>
          elem?.assignment.map((assignment) =>
            state.getMaterials.map((material) => (
              <Lessons
                key={elem?.id}
                variant='Mentor'
                element={{
                  id: elem?.id,
                  text: `${elem?.id} - ${elem?.text}`,
                  videoUrl: elem?.youtube,
                  assignmentId: assignment?.id,
                  votedStudents: assignment?.countSubmission,
                  lesson: assignment?.title,
                  date: assignment?.created,
                  urlFile: material?.file,
                  materialId: material?.id,
                  title: material?.title,
                  students: state.getVotedStudents?.responseStudents || [],
                }}
                getVotedStudents={getVotedStudents}
                onEdit={navigateToEditLessonPage}
                onClickStudent={navigateToHomeWorkPage}
              />
            ))
          )
        )}
      </LessonsBlock>
    </div>
  )
}

export default MentorInstructorLessons
const Location = styled.div`
  width: 200px;
  display: flex;
  margin-bottom: 26px;
  gap: 5px;
`
const Block = styled.div`
  display: flex;
  width: 1400px;
  justify-content: space-between;
  @media (max-width: 415px) {
    align-items: baseline;
    width: 100%;
    justify-content: space-between;
  }
`
const LessonsBlock = styled.div`
  @media (max-width: 415px) {
    overflow-x: scroll;
    width: 350px;
  }
`
const ButtonsBlock = styled.div`
  display: none;
  @media (max-width: 415px) {
    display: flex;
  }
`
const ButtonsBlock2 = styled.div`
  display: flex;
  @media (max-width: 415px) {
    display: none;
  }
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
  @media (max-width: 415px) {
    color: var(--breadcrumbs, #878787);
    font-family:
      Zen Kaku Gothic New,
      sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
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
  @media (max-width: 415px) {
    color: var(--light-blue, #134764);
    font-family:
      Zen Kaku Gothic New,
      sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
