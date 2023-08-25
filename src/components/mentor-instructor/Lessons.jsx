import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  MentorInstructorAction,
  deleteMentorAssignmnentsById,
  deleteMentorLesson,
  getMentorLessons,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Button from '../UI/Button'
import Lessons from '../UI/Lessons'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'

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
  const navigateToEditLessonPage = (element) => {
    navigate(`edit_lesson/${element.id}`)
  }
  const createLesson = () => {
    navigate('create-lesson')
  }
  const addAssignment = (element) => {
    navigate(`create_assignment/${element.id}`)
  }
  const navigateToHomeWorkPage = ({ student, submissinonId, assimentId }) => {
    navigate(`homework/${submissinonId}/${student.studentName}/${assimentId}`)
  }
  const closeSnackbar = () => {
    dispatch(
      MentorInstructorAction.SnackbarClose({
        isSuccess: false,
        status: state.status,
      })
    )
  }
  const [showModal, setShowModal] = useState({
    state: false,
    variant: '',
  })
  const [inLessonIds, setInLessonIds] = useState({
    lessonId: null,
    assignmentId: null,
  })
  const modalShow = (element) => {
    setInLessonIds({
      lessonId: element.id,
      assignmentId: null,
    })
    setShowModal({
      state: true,
      variant: 'lesson',
    })
  }
  const modalClose = () => {
    setShowModal({
      state: false,
      variant: 'lesson',
    })
  }
  const deleteLesson = () => {
    dispatch(deleteMentorLesson({ id: inLessonIds.lessonId, groupId }))
    modalClose()
  }
  const showDeleteAssignmentModal = (elem) => {
    setInLessonIds({
      lessonId: null,
      assignmentId: elem.id,
    })
    setShowModal({
      state: true,
      variant: 'assignment',
    })
  }
  const deleteAssignment = () => {
    dispatch(
      deleteMentorAssignmnentsById({ id: inLessonIds.assignmentId, groupId })
    )
    modalClose()
  }
  const [id, setId] = useState()
  const getId = (value) => {
    setId(value)
  }

  return (
    <div>
      <Block>
        <Location>
          <LocationText onClick={navToCourse}>{groupName} /</LocationText>
          <LocationText2>Сабактар</LocationText2>
        </Location>
        <ButtonsBlock>
          <Button variant='Add-Button' onClick={createLesson}>
            +
          </Button>
        </ButtonsBlock>
        <ButtonsBlock2>
          <Button variant='create group' onClick={createLesson}>
            Сабак кошуу
          </Button>
        </ButtonsBlock2>
      </Block>
      <LessonsBlock>
        {state.getLessons?.lesson?.map((elem) => (
          <Lessons
            variant='Mentor'
            variantLessonEditTools
            element={{
              id: elem?.id,
              text: `${elem?.id} - ${elem?.text}`,
              urlPdf: elem?.file,
              titleFile: elem?.titleFile,
              assignments: elem?.assignments,
              lessons: elem?.youtubeVideo,
              youtubeUrl: elem?.youtube,
              youtubeTitle: elem?.youtubeTitle,
            }}
            onEdit={navigateToEditLessonPage}
            deleteLesson={modalShow}
            id={id}
            getId={getId}
            deleteAssignment={showDeleteAssignmentModal}
            addAssignment={addAssignment}
            onClickStudentSubmission={navigateToHomeWorkPage}
          />
        ))}
      </LessonsBlock>
      <CustomizedSnackbars
        variant={state.status}
        open={state.isSuccess}
        message={
          state.status === 'success'
            ? 'Куттуктайбыз!'
            : state.status === 'error' && 'Ката'
        }
        text={
          state.status === 'success'
            ? 'Сабагыңыз ийгиликтүү өчүрүлдү'
            : state.status === 'error' && 'Сервер менен байланыша албай жатабыз'
        }
        closeSnackbar={closeSnackbar}
      />
      {showModal.state && (
        <Modall onClose={modalClose}>
          <ModalBlock>
            <OnDeleteText>
              {showModal.variant === 'lesson' ? 'Ушул ' : 'Ушул '}
              {showModal.variant === 'lesson' ? 'сабакты ' : 'тапшырманы '}
              өчүрүүдө ишенимдүүсүзбү?
            </OnDeleteText>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button
                variant='RequestRefusal-Buttons'
                onClick={
                  showModal.variant === 'lesson'
                    ? deleteLesson
                    : deleteAssignment
                }
              >
                Ооба
              </Button>
              <Button variant='RequestAllow-Buttons' onClick={modalClose}>
                Жок
              </Button>
            </div>
          </ModalBlock>
        </Modall>
      )}
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
  justify-content: space-between;
  width: 1140px;
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
const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const OnDeleteText = styled.h1`
  font-size: 20px;
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  margin-bottom: 50px;
  text-align: center;
  padding: 5px;
`
