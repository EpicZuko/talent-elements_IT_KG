import React from 'react'
import styled from 'styled-components'

import SideIcon from '../../assets/icon/sideicon/_2412063098704.svg'
import SideIcon4 from '../../assets/icon/sideicon/Group 427320482 (2).svg'
import group1 from '../../assets/icon/sideicon/group1.png'
import UserIcon from '../../assets/icon/sideicon/user.svg'
import SideIcon2 from '../../assets/icon/sideicon/Слой_x0020_1 (7).svg'
import SideIcon3 from '../../assets/icon/sideicon/Слой_x0020_1 (8).svg'
import SideIcon5 from '../../assets/icon/sideicon/Слой_x0020_1 (9).svg'
import SideIcon1 from '../../assets/icon/sideicon/Слой_x0020_1.svg'

const SiderBar = ({
  id,
  variant,
  absoluteNone,
  onClickUserCourse,
  onClickUserGroup,
  onClickUserProfile,
  onClickManagerGroup,
  onClickManagerStudent,
  onClickManagerInstructor,
  onClickManagerStafAdmin,
  onClickManagerSeoAdmin,
  onClickMentorInstructorGroup,
  onClickStafAdminGroup,
  onClickStafAdminInstructor,
  onClickSeoAdminGroup,
  onClickSeoAdminInstructor,
  onClickSeoAdminManager,
  onCloseBackdrop,
}) => {
  return (
    <SideBarBlock absoluteNone={absoluteNone} onClick={onCloseBackdrop}>
      <Con>
        <DivImg>
          <img src={group1} alt='error' />
        </DivImg>
        <div key={id}>
          {variant === 'user' && (
            <div>
              <div>
                <DivContainer onClick={onClickUserCourse}>
                  <div>
                    <Img src={SideIcon} alt='error' />
                  </div>
                  <div>
                    <Title>Курстар</Title>
                  </div>
                </DivContainer>
                <DivContainer onClick={onClickUserGroup}>
                  <div>
                    <Img src={SideIcon1} alt='error' />
                  </div>
                  <div>
                    <Title>Тайпа</Title>
                  </div>
                </DivContainer>
              </div>
              <DivContainer1>
                <div>
                  <Img src={UserIcon} alt='error' />
                </div>
                <div role='button' tabIndex='0' onClick={onClickUserProfile}>
                  <Title>Профиль</Title>
                </div>
              </DivContainer1>
            </div>
          )}

          {variant === 'manager' && (
            <div>
              <DivContainer onClick={onClickManagerGroup}>
                <div>
                  <Img src={SideIcon1} alt='error' />
                </div>
                <div>
                  <Title>Тайпалар</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickManagerStudent}>
                <div>
                  <Img src={SideIcon2} alt='error' />
                </div>
                <div>
                  <Title>Студенттер</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickManagerInstructor}>
                <div>
                  <Img src={SideIcon3} alt='error' />
                </div>
                <div>
                  <Title>Инструкторлор</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickManagerStafAdmin}>
                <div>
                  <Img src={SideIcon4} alt='error' />
                </div>
                <div>
                  <Title>STAFF Админ</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickManagerSeoAdmin}>
                <div>
                  <Img src={SideIcon5} alt='error' />
                </div>
                <div>
                  <Title>СЕО Админ</Title>
                </div>
              </DivContainer>
            </div>
          )}
          {variant === 'mentor' && (
            <div>
              <DivContainer onClick={onClickMentorInstructorGroup}>
                <div>
                  <Img src={SideIcon1} alt='error' />
                </div>
                <div>
                  <Title>Тайпалар</Title>
                </div>
              </DivContainer>
            </div>
          )}
          {variant === 'staf/admin' && (
            <div>
              <DivContainer onClick={onClickStafAdminGroup}>
                <div>
                  <Img src={SideIcon1} alt='error' />
                </div>
                <div>
                  <Title>Тайпалар</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickStafAdminInstructor}>
                <div>
                  <Img src={SideIcon3} alt='error' />
                </div>
                <div>
                  <Title>Инструкторы</Title>
                </div>
              </DivContainer>
            </div>
          )}
          {variant === 'seo/admin' && (
            <div>
              <DivContainer onClick={onClickSeoAdminGroup}>
                <div>
                  <Img src={SideIcon1} alt='error' />
                </div>
                <div>
                  <Title>Тайпалар</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickSeoAdminInstructor}>
                <div>
                  <Img src={SideIcon3} alt='error' />
                </div>
                <div>
                  <Title>Инструкторлор</Title>
                </div>
              </DivContainer>
              <DivContainer onClick={onClickSeoAdminManager}>
                <div>
                  <img src={SideIcon3} alt='error' />
                </div>
                <div>
                  <Title>Менеджер</Title>
                </div>
              </DivContainer>
            </div>
          )}
        </div>
      </Con>
    </SideBarBlock>
  )
}

export default SiderBar
const SideBarBlock = styled.div`
  * {
    margin: 0;
  }
  z-index: 7;
  @media (max-width: 391px) {
    background-color: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
  }
`
const Con = styled.div`
  width: 243px;
  height: 969px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding-left: 17px;
  padding-top: 90px;
  position: relative;
  cursor: pointer;
  @media (max-width: 391px) {
    width: 230px;
    height: 330px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    padding-left: 15px;
    padding-top: 0px;
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
`
const DivContainer = styled.div`
  width: 205px;
  height: 45px;
  gap: 20px;
  align-items: center;
  display: flex;
  align-items: center;
  padding-left: 18px;
  border-radius: 8px;
  margin-top: 10px;
  &:hover {
    background-color: rgba(116, 194, 215, 0.2);
    text-align: center;
  }
  @media (max-width: 391px) {
    width: 200px;
    height: 40px;
    align-items: center;
    display: flex;
    align-items: center;
    gap: 20px;
    padding-left: 17px;
    border-radius: 8px;
    &:hover {
      background-color: rgba(116, 194, 215, 0.2);
    }
  }
`
const DivImg = styled.div`
  display: none;
  @media (max-width: 391px) {
    width: 230px;
    border-bottom: 1px solid black;
    margin-left: -14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    padding-top: 15px;
  }
`
const DivContainer1 = styled.div`
  display: none;

  @media screen and (max-width: 391px) {
    width: 205px;
    height: 45px;
    gap: 20px;
    align-items: center;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding-left: 17px;
    border-radius: 8px;
    &:hover {
      background-color: rgba(116, 194, 215, 0.2);
    }
  }
`
const Img = styled.img`
  width: 30px;
  height: 30.08px;
`
const Title = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 28.96px;
  color: rgba(11, 56, 82, 1);
`
