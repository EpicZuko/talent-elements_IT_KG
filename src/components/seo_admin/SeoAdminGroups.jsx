import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { getAllGroups } from '../../services/reducerSlice/seoAdminGroupsSlice/allGroups'
import Card from '../UI/card/Card'

const SeoAdminGroup = () => {
  const state = useSelector((state) => state.seoAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllGroups())
  }, [])
  const groupIdOrStudents = (element) => {
    navigate(`/${element.id}`)
  }

  return (
    <div>
      <Container2>
        <StyledH5>Тайпалар</StyledH5>
        <Card
          variant='Manager_group'
          variantClick='click'
          user={state?.card}
          navToStudents={(element) => groupIdOrStudents(element)}
          navToCurrentGroup={() => ''}
          variantDelete=''
        />
      </Container2>
    </div>
  )
}

export default SeoAdminGroup

const StyledH5 = styled.h5`
  color: #134764;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  margin-top: 30px;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 391px) {
    color: var(--light-blue, #134764);
    font-size: 16px;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 0;
  }
`
const Container2 = styled.div`
  margin-left: 35px;
  @media (max-width: 391px) {
    margin-left: 17px;
  }
`
