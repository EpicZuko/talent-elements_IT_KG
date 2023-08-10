import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MentorRequest } from '../../services/mentorInstructorSlice/Body'
import { SelectorFuncMentorBody } from '../../utils/helpers/useSelector/SelectorFunc'
import LessonsCard from '../UI/LessonsCard'

const MentorInstructorLessons = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = SelectorFuncMentorBody()
  const navToGroup = () => {
    navigate('/groups')
  }
  useEffect(() => {
    dispatch(MentorRequest({ page: 'lessons', id: state.courseName }))
  }, [dispatch])
  return (
    <div>
      <Location>
        <LocationText onClick={navToGroup}>Мои группы /</LocationText>
        <LocationText2>Уроки {state.courseName}</LocationText2>
      </Location>
      {state.lessons.title && (
        <div>
          {state.lessons.map((el) => (
            <LessonsCard
              group={[
                {
                  id: el.id,
                  title: el.title,
                  img: el.photo,
                },
              ]}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MentorInstructorLessons

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
