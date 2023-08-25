import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStaffAdminLesson } from '../../services/reducerSlice/staffAdminSlice/staffAdmin'
import Lessons from '../UI/Lessons'

const StaffAdminLesson = () => {
  const state = useSelector((state) => state.staffAdmin)
  const [id, setID] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lessonsId } = useParams()

  useEffect(() => {
    dispatch(
      getStaffAdminLesson({
        id: +lessonsId,
      })
    )
  }, [lessonsId])

  const navigateHomeWorkStudentId = (elem) => {
    navigate(
      `/lessons/submission/${elem.submissinonId}/assigment/${elem.assimentId}`
    )
  }

  const goBackGroupStaffAdmin = () => {
    navigate(-1)
  }

  return (
    <DivLesson>
      <H6 onClick={goBackGroupStaffAdmin}>
        {state?.getStaffAdminLesson?.groupName} /<H5>Сабактар</H5>
      </H6>
      <DivStyled>
        {state.getStaffAdminLesson?.staffAdminLesson.length > 0 ? (
          state?.getStaffAdminLesson?.staffAdminLesson?.map((elem) => (
            <Lessons
              id={id}
              variant='Mentor'
              element={{
                id: elem?.id,
                text: `${elem?.id} - ${elem?.title}`,
                videoUrl: elem?.youtube,
                title: elem?.title,
                urlPdf: elem?.file,
                lesson: elem?.titleFile,
                lessons: elem?.lessons,
                titleFile: elem.titleFile,
                assignments: elem?.assignments,
              }}
              variantClick='click'
              onClickStudentSubmission={(elem) =>
                navigateHomeWorkStudentId(elem)
              }
              onEdit={() => ''}
              getId={setID}
            />
          ))
        ) : (
          <H3>Азырынча бул жер бош</H3>
        )}
      </DivStyled>
    </DivLesson>
  )
}

export default StaffAdminLesson

const DivLesson = styled.div`
  padding: 35px;
  @media (max-width: 391px) {
    padding: 0px;
  }
`
const H6 = styled.h6`
  color: rgba(135, 135, 135, 1);
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  margin-bottom: 11px;
  @media (max-width: 391px) {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 16px;
    margin-bottom: 0px;
  }
`
const H5 = styled.h5`
  color: rgba(19, 71, 100, 1);
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 5px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const DivStyled = styled.div`
  @media (max-width: 391px) {
    width: 100px;
  }
`
const H3 = styled.h3`
  margin-left: 5px;
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  @media (max-width: 391px) {
    width: 200px;
    margin-left: 40px;
    margin-top: 20px;
  }
`
