import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrowLeftIcon from '../../assets/icon/notificationIcons/strelka.svg'

const StaffAdminAcessToDeleteGroup = () => {
  const navigate = useNavigate()
  const navPrevPage = () => {
    navigate(-1)
  }
  return (
    <Container>
      <Location>
        <BackIcon onClick={navPrevPage} src={arrowLeftIcon} alt='none' />
        <H5>Эскертмелер</H5>
      </Location>
    </Container>
  )
}

export default StaffAdminAcessToDeleteGroup

const Container = styled.div`
  padding: 35px;
`

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const BackIcon = styled.img`
  cursor: pointer;
`

const H5 = styled.h5`
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: hsla(201, 68%, 23%, 1);
  @media (max-width: 391px) {
    font-family: Zen Kaku Gothic New;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
`
