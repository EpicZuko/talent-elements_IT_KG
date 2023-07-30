import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

export const Location = () => {
  const loc = useLocation()
  return (
    <div>
      <LocationStyled>{loc?.pathname?.slice(1, 1000)}</LocationStyled>
    </div>
  )
}
const LocationStyled = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => (props.variant === 'gray' ? '#878787' : '#134764')};
  @media (max-width: 390px) {
    color: var(--light-blue, #134764);
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
