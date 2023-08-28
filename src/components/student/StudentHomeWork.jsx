import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import FileIcon from '../../assets/icon/studentIcon/file.svg'
import TextIcon from '../../assets/icon/studentIcon/text.svg'
import {
  getStudentHomeWork,
  postStudentFileUpload,
  postStudentTextForm,
} from '../../services/reducerSlice/studentSlice/studentAction'
import { studentAction } from '../../services/reducerSlice/studentSlice/studentSlice'
import Button from '../UI/Button'
import HomeWorkTask from '../UI/HomeWorkTask'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'

const StudentHomeWork = () => {
  const FilePicker = useRef(null)
  const [task, setTask] = useState(null)
  const [textAnswer, setTextAnswer] = useState(false)
  const [textTarea, setTextTarea] = useState('')

  const state = useSelector((state) => state.student)
  const { assignmentId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getStudentHomeWork({ id: +assignmentId }))
  }, [assignmentId])

  const handlerFileClick = () => {
    FilePicker.current.click()
  }

  const handlerFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      dispatch(postStudentFileUpload({ file, id: +assignmentId }))
    }
  }

  const closeSnackBarFileUpload = () => {
    dispatch(
      studentAction.snackBarPostUploadFile({
        open: false,
        status: state.postStudentFileUploadStatus,
      })
    )
  }

  const textAnswerHandler = () => {
    setTextAnswer(true)
  }
  const textAnswerOnClosehandler = () => {
    setTextAnswer(false)
  }

  const textonChangeHandler = (event) => {
    setTextTarea(event.target.value)
  }

  const closeSnackBarTextForm = () => {
    dispatch(
      studentAction.snackBarPostTextForm({
        status: state.postStudentTextFormStatus,
        open: false,
      })
    )
  }

  const submitTextForm = () => {
    if (textTarea.length > 0) {
      dispatch(postStudentTextForm({ text: textTarea, id: +assignmentId }))
      setTextAnswer(false)
      setTextTarea('')
    }
  }

  const goBackLesson = () => {
    navigate(-1)
  }
  return (
    <div>
      <CustomizedSnackbars
        variant={state.postStudentTextFormStatus}
        open={state.postStudentTextFormSnackbar.open}
        closeSnackbar={closeSnackBarTextForm}
        message={
          state.postStudentTextFormStatus === 'success'
            ? 'Куттуктайбыз! Сиздин үй тапшырмаңыз ийгиликтүү жөнөтүлдү! Сиздин мээнетиңизди баалайбыз! Жооп үчүн ыраазычылык! 🏆'
            : 'Кечиресиз! Үй тапшырмасын жөнөтүүдө ката кетти! Карап чыгып кайра жөнөтүңүз! 😭'
        }
      />
      <CustomizedSnackbars
        variant={state.postStudentFileUploadStatus}
        open={state.postStudentFileUploadOpen}
        closeSnackbar={closeSnackBarFileUpload}
        message={
          state.postStudentFileUploadStatus === 'success'
            ? 'Куттуктайбыз! Сиздин файлыңыз ийгиликтүү жөнөтүлдү! Сиздин мээнетиңизди баалайбыз! Жооп үчүн ыраазычылык! 🏆'
            : 'Кечиресиз! Файл жөнөтүүдө ката кетти! Карап чыгып кайра жөнөтүңүз! 😭'
        }
      />
      <StyledH6 onClick={goBackLesson}>
        Сабактар /<StyledH5>{state?.homeWorkGroupName}</StyledH5>
      </StyledH6>
      <DivHomeWork>
        <H5>Үй тапшырмасы</H5>
        {state.getStudentHomeWorkArray.length > 0 ? (
          <HomeWorkTask
            taskN1={task}
            setTaskN1={setTask}
            Tasks={state?.getStudentHomeWorkArray}
          />
        ) : (
          <H4>Азырынча бул жер бош</H4>
        )}
      </DivHomeWork>
      {state?.getStudentHomeWorkArray && (
        <DivText>
          {!textAnswer && (
            <StyledDivFiles>
              <StyledDivLoading onClick={textAnswerHandler}>
                <img src={TextIcon} alt='' />
                <p>Жооп (Кара сөз)</p>
              </StyledDivLoading>
              <StyledDivLoading onClick={handlerFileClick}>
                <img src={FileIcon} alt='' />
                <p>Файл жүктөө</p>
              </StyledDivLoading>
            </StyledDivFiles>
          )}
          <StyledInputFiles
            ref={FilePicker}
            type='file'
            accept='.pdf'
            multiple
            onChange={handlerFileUpload}
          />
          {textAnswer && (
            <Modall variant='Modall_Group' onClose={textAnswerOnClosehandler}>
              <StyledModallDiv>
                <StyledModalltextDiv>
                  <StyledModalltext>Үй тапшырмасы</StyledModalltext>
                  <Textarea value={textTarea} onChange={textonChangeHandler} />
                  <StyledDivButton>
                    <Button variant='sing in' onClick={submitTextForm}>
                      Жөнөтүү
                    </Button>
                  </StyledDivButton>
                </StyledModalltextDiv>
              </StyledModallDiv>
            </Modall>
          )}
        </DivText>
      )}
    </div>
  )
}
export default StudentHomeWork

const DivHomeWork = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 20px;
  }
`
const H5 = styled.h5`
  color: var(--dark-blue, #0b3852);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    font-size: 20px;
  }
`
const DivText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1270px;
  @media (max-width: 391px) {
    width: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
const H4 = styled.h4`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 20px;
  margin-top: 20px;
`
const StyledDivFiles = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 250px;
`
const StyledDivLoading = styled.div`
  margin-right: 44px;
`
const StyledInputFiles = styled.input`
  display: none;
`
const StyledModallDiv = styled.div`
  width: 849px;
  height: 531px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 391px) {
    width: 360px;
    height: 200px;
  }
`
const StyledModalltextDiv = styled.div`
  width: 589px;
  margin-bottom: 30px;
  color: rgba(11, 56, 82, 1);
  @media (max-width: 391px) {
    width: 320px;
    margin-top: 50px;
    margin-bottom: 0px;
  }
`
const StyledModalltext = styled.div`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    font-size: 20px;
  }
`
const StyledDivButton = styled.div`
  width: 589px;
  margin-top: 90px;
`
const Textarea = styled.textarea`
  width: 589px;
  height: 165px;
  flex-shrink: 0;
  border-radius: 8px;
  color: rgba(135, 135, 135, 1);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  resize: none;
  padding: 10px;
  margin-top: 30px;
  @media (max-width: 391px) {
    width: 296px;
    margin-top: 14px;
    margin-bottom: -70px;
    height: 83px;
  }
`
const StyledH6 = styled.h6`
  color: var(--breadcrumbs, #878787);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  padding-left: 35px;
  padding-top: 35px;
  @media (max-width: 391px) {
    font-size: 13px;
    padding-left: 20px;
    padding-top: 20px;
  }
`
const StyledH5 = styled.h5`
  color: var(--dark-blue, #0b3852);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5px;
  @media (max-width: 391px) {
    font-size: 13px;
  }
`
