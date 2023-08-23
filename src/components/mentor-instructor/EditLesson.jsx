import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  MentorInstructorAction,
  putMentorLessons,
} from '../../services/reducerSlice/mentorInstructorSlice/MentorInstructor'
import SelectorFuncMentor from '../../utils/helpers/useSelector/SelectorFunc'
import Button from '../UI/Button'
import Input from '../UI/Input'
import CustomizedSnackbars from '../UI/Snackbar'

export const MentorEditLesson = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [TitleInputValue, setTitleInputValue] = useState('')
  const [YoutubeInputValue, setYoutubeInputValue] = useState('')
  const [FileInputValue, setFileInputValue] = useState('')
  const [UrlInputValue, setUrlInputValue] = useState('')
  const [format, setFormat] = useState('')
  const navToLesson = () => {
    navigate(-1)
  }
  const { lessonId } = useParams()
  const state = SelectorFuncMentor()
  const TitleInputValueHandler = (event) => {
    setTitleInputValue(event.target.value)
  }

  const YoutubeInputValueHandler = (event) => {
    setYoutubeInputValue(event.target.value)
  }
  const FileInputValueHandler = (event) => {
    setFileInputValue(event.target.value)
  }

  const UrlinputValueHandler = (event) => {
    setUrlInputValue(event.target.value)
  }
  const editLesson = () => {
    const formData = new FormData()
    formData.append('file', format)
    if (TitleInputValue.trim() !== '' && UrlInputValue.trim() !== '') {
      dispatch(
        putMentorLessons({
          id: lessonId,
          title: TitleInputValue,
          titleFile: FileInputValue,
          titleYoutube: YoutubeInputValue,
          youtube: UrlInputValue,
          file: format,
          lessonId,
        })
      )
    }
    setTitleInputValue('')
    setUrlInputValue('')
    setYoutubeInputValue('')
    setFileInputValue('')
    setFormat(null)
  }
  const closeSnackbar = () => {
    dispatch(
      MentorInstructorAction.SnackbarClose({
        isSuccess: false,
        status: state.status,
      })
    )
  }
  const fileGroup = useRef(null)

  const changeHandlerFile = (event) => {
    const fileGroup = event.target.files[0]
    setFormat(fileGroup)
  }
  return (
    <div>
      <Location>
        <LocationText onClick={navToLesson}>Сабактар /</LocationText>
        <LocationText2>Сабакты түзөтүү</LocationText2>
      </Location>
      <Div onSubmit={editLesson}>
        <Input
          onChange={TitleInputValueHandler}
          variant='enter-lesson'
          placeholder='Аталышын жазыңыз'
          value={TitleInputValue}
        />
        <Input
          onChange={UrlinputValueHandler}
          variant='enter-lesson'
          placeholder='YouTube видеого шилтеме кошуңуз'
          value={UrlInputValue}
        />
        <Input
          onChange={YoutubeInputValueHandler}
          variant='enter-lesson'
          placeholder='Видеонун атын жазыңыз'
          value={YoutubeInputValue}
        />
        <InputFile
          ref={fileGroup}
          type='file'
          accept='pdf/*,.pdf'
          onChange={changeHandlerFile}
        />
        <Input
          onChange={FileInputValueHandler}
          variant='enter-lesson'
          placeholder='Файлдын аталышын жазыңыз'
          value={FileInputValue}
        />
      </Div>
      <ButtonDiv>
        <Button onClick={editLesson} variant='create group-page'>
          Сабакты кайрадан түзөтүү
        </Button>
      </ButtonDiv>
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
            ? 'Сабагыныз ийгиликтүү жаңыланды'
            : state.status === 'error' && 'Сервер менен байланыша албай жатабыз'
        }
        closeSnackbar={closeSnackbar}
      />
    </div>
  )
}

const Location = styled.div`
  margin-bottom: 100px;
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
  @media (max-width: 415px) {
    font-size: 16px;
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
    font-size: 16px;
  }
`
const Div = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  gap: 50px;
  @media (max-width: 415px) {
    margin-left: 15px;
  }
`
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 550px;
  margin-top: 50px;
  @media (max-width: 415px) {
    margin-left: 0;
    margin-top: 100px;
  }
`
const InputFile = styled.input`
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 15px;
  color: rgba(19, 71, 100, 1);
  font-weight: 600;
  &::-webkit-file-upload-button {
    transition: 0.3s;
    cursor: pointer;
    background: rgba(19, 71, 100, 1);
    width: 200px;
    height: 25px;
    color: white;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
    font-weight: 600;
    &:hover {
      background: #0c2b3c;
    }
  }
`
