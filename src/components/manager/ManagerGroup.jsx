import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { managerGetAllGroups } from '../../services/reducerSlice/manager/managerSlice/managerSlice'
import Card from '../UI/card/Card'

const ManagerGroup = () => {
  const state = useSelector((state) => state.manager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(managerGetAllGroups())
  }, [])
  return (
    <div>
      <div>
        <TitleH5>Группы</TitleH5>
      </div>
      <Card user={state?.managerCard} variant='Manager_group' />
    </div>
  )
}

export default ManagerGroup

const TitleH5 = styled.h5`
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
`
