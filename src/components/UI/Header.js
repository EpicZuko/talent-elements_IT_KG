import React from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import headerIcon from '../../assets/icon/headericon/_2255362586416.svg'
import menuBurgerIcon from '../../assets/icon/headericon/menu.svg'
import notificationIcon from '../../assets/icon/headericon/notification.svg'

const Header = ({
  variant,
  data,
  onClickProfile,
  onClickNotification,
  onBurgerMenuClick,
}) => {
  const { avatarImg, name, notificationNumberCount } = data
  return (
    <StyledDivContainer>
      <LeftBlock>
        <StyledImg src={headerIcon} alt='error' />
        <StyledH1>IT.KG</StyledH1>
      </LeftBlock>
      <RightBLock>
        <Div onClick={onClickProfile} variant={variant}>
          <Avatar src={avatarImg} alt='error' />
          <StyledH3>{name}</StyledH3>
        </Div>
        {variant !== 'Seo admin' && (
          <>
            <StyledNotication
              onClick={onClickNotification}
              src={notificationIcon}
              alt='error'
            />
            {notificationNumberCount > 0 && (
              <NotificationCount>{notificationNumberCount}</NotificationCount>
            )}
          </>
        )}
        <BurgerMenu
          onClick={onBurgerMenuClick}
          src={menuBurgerIcon}
          alt='none'
        />
      </RightBLock>
    </StyledDivContainer>
  )
}

export default Header

const StyledDivContainer = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 55px;
  background: #134764;
  justify-content: space-between;
`
const BurgerMenu = styled.img`
  display: none;
  @media (max-width: 390px) {
    display: flex;
  }
  @media (max-width: 414px) {
    display: flex;
  }
  @media (max-width: 540px) {
    display: flex;
  }
  @media (max-width: 820px) {
    display: flex;
  }
  @media (max-width: 912px) {
    display: flex;
  }
`
const Div = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: ${({ variant }) => variant === 'Seo admin' && '100px'};
  @media (max-width: 390px) {
    display: none;
  }
  @media (max-width: 414px) {
    display: none;
  }
  @media (max-width: 540px) {
    display: none;
  }
  @media (max-width: 820px) {
    display: none;
  }
  @media (max-width: 912px) {
    display: none;
  }
`

const StyledImg = styled.img`
  width: 30px;
  height: 24.304px;
  margin-left: 30px;
`
const StyledH1 = styled.h1`
  display: flex;
  align-items: center;
  width: 55px;
  height: 27px;
  color: #fff;
  font-size: 23px;
  font-family: 'Kaushan Script';
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 20px;
`
const StyledH3 = styled.h3`
  color: var(--white, #fff);
  margin-left: 17px;
  text-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const StyledNotication = styled.img`
  width: 25px;
  margin-left: 50px;
  margin-right: 21px;
  height: 24px;
  cursor: pointer;
`
const RightBLock = styled.div`
  display: flex;
  align-items: center;
`
const LeftBlock = styled.div`
  display: flex;
  align-items: center;
`
const NotificationCount = styled.p`
  background: rgba(248, 65, 53, 1);
  border-radius: 200px;
  text-align: center;
  padding: 2px 5px 2px 5px;
  color: white;
  font-size: 10px;
  font-family: 'Roboto', sans-serif;
  position: relative;
  right: 31px;
  bottom: 7px;
`
