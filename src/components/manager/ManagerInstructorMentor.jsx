import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import {
  managerInstructorMentor,
  managerInstructorMentorPutUnBlockOrBlock,
} from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Input from '../UI/Input'
import Student from '../UI/Student'

const ManagerInstructorMentor = () => {
  const [search, setSearch] = useState('')
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(managerInstructorMentor())
  }, [])

  const instructorBlockButton = (id) => {
    dispatch(managerInstructorMentorPutUnBlockOrBlock({ id, block: 'block' }))
  }
  const insturctorUnLockButton = (id) => {
    dispatch(managerInstructorMentorPutUnBlockOrBlock({ id, block: 'unblock' }))
  }
  const searchChangeValue = (event) => {
    setSearch(event.target.value)
  }
  const searchFilter = () => {
    const filterSearch = state?.managerInstructorMentorArray?.filter((elem) => {
      return elem?.name?.toLowerCase()?.includes(search)
    })
    return filterSearch
  }
  const filterSearch = searchFilter()

  const navigateInstructorMentorProfile = (id) => {
    navigate(`/instructorOrMentor/${id}`)
  }
  return (
    <div>
      <DivInput>
        <H6>Инструкторы, Мен.</H6>
        <Input
          variant='add Search'
          placeholder='Поиск...'
          onChange={searchChangeValue}
          value={search}
        />
      </DivInput>
      {filterSearch.length > 0 ? (
        <Student
          variant='Instructors'
          UserDataArray={filterSearch}
          variantClick='disbled'
          onClickInstructorBlockButton={(element) =>
            instructorBlockButton(element.id)
          }
          onClickInstructorUnlockButton={(element) =>
            insturctorUnLockButton(element.id)
          }
          variantName='click'
          onClickImgName={(element) =>
            navigateInstructorMentorProfile(element.id)
          }
        />
      ) : (
        <H3>У вас еще нет Менторо и Инструкторов</H3>
      )}
    </div>
  )
}
export default ManagerInstructorMentor

const DivInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 950px;
  margin-bottom: 16px;
  @media (max-width: 391px) {
    display: flex;
    flex-direction: column;
    width: 360px;
  }
`
const H6 = styled.h6`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 19px;
  @media (max-width: 391px) {
    font-size: 16px;
  }
`
const H3 = styled.h3`
  color: var(--light-blue, #134764);
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
