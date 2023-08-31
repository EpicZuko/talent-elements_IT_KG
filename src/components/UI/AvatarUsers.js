import React, { useRef } from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import DeleteButton from '../../assets/icon/button-icons/trash.svg'
import ChangeIconUser from '../../assets/icon/Frame 32.svg'
import IconUser from '../../assets/icon/Frame 42.svg'
import Button from './Button'

const AvatarUsers = ({
  variant,
  user,
  setFileImg,
  fileImg,
  deleteButtons,
  setDeleteButton,
  editButtons,
  setEditButton,
  profileImg,
  onClickBlockButtton,
  setFormat,
  logoutAccount,
}) => {
  const filePicker = useRef(null)
  const handlerFiles = (event) => {
    const file = event.target.files[0]
    setFormat(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setFileImg(url)
      setEditButton(true)
    }
  }
  const handlerFilePicker = () => {
    filePicker.current.click()
  }
  const handlerMouseEnter = () => {
    setDeleteButton(true)
  }
  const handlerMouseLeave = () => {
    setDeleteButton(false)
  }
  const handlerdAvatarDelete = () => {
    setFileImg('')
    setEditButton(false)
    handlerMouseLeave()
    filePicker.current.value = ''
  }
  return (
    <div>
      <StyledContainer>
        <Container>
          {variant === 'User_admin' && (
            <StyledDiv>
              <StyledAvatar onMouseLeave={handlerMouseLeave}>
                <div>
                  <Avatar src={fileImg} sx={{ width: 180, height: 180 }} />
                </div>
                {editButtons && deleteButtons && (
                  <Buttons onClick={handlerdAvatarDelete}>
                    <img src={DeleteButton} alt='error deleteButton' />
                  </Buttons>
                )}
                {editButtons && <Div onMouseEnter={handlerMouseEnter} />}
                {!editButtons && (
                  <StyledActionImg
                    onClick={handlerFilePicker}
                    onMouseLeave={handlerMouseLeave}
                    src={IconUser}
                    alt='error'
                  />
                )}
                {editButtons && (
                  <StyledActionImg
                    onClick={handlerFilePicker}
                    onMouseLeave={handlerMouseLeave}
                    src={ChangeIconUser}
                    alt='error'
                  />
                )}
                <StyledInput
                  onChange={handlerFiles}
                  ref={filePicker}
                  onMouseLeave={handlerMouseLeave}
                  type='file'
                  accept='Emage/*,.png,.jpg,.gif,.web,.svg'
                />
              </StyledAvatar>
            </StyledDiv>
          )}
          {variant === 'Visitor' && (
            <StyledDiv>
              <StyledAvatar>
                <div>
                  <Avatar src={profileImg} sx={{ width: 180, height: 180 }} />
                </div>
              </StyledAvatar>
            </StyledDiv>
          )}
          {variant === 'manager_group' && (
            <StyledDiv>
              <StyledAvatar>
                <div>
                  <Avatar src={profileImg} sx={{ width: 180, height: 180 }} />
                </div>
              </StyledAvatar>
            </StyledDiv>
          )}
          <StyledDivContainerEmail>
            {user.map((element) => (
              <StyledDivEmail key={element.id}>
                <StyledName>{element.name}</StyledName>
                <StyledEmail>{element.email}</StyledEmail>
                <ButtonDiv>
                  {variant === 'manager_group' && element.block && (
                    <Button
                      onClick={onClickBlockButtton}
                      variant='ActionBlock-Button'
                    >
                      Төлөнбөдү
                    </Button>
                  )}
                </ButtonDiv>
              </StyledDivEmail>
            ))}
          </StyledDivContainerEmail>
        </Container>
        <LogoutButton>
          <Button onClick={logoutAccount} variant='logout'>
            Аккаунттан чыгуу
          </Button>
        </LogoutButton>
      </StyledContainer>
    </div>
  )
}

export default AvatarUsers
const StyledContainer = styled.div`
  @media screen and (max-width: 391px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`
const Container = styled.div`
  width: 465.02px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 27px;
  @media screen and (max-width: 391px) {
    width: 329px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid black;
  }
`
const StyledDiv = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledAvatar = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 391px) {
    display: flex;
    justify-content: center;
  }
`
const StyledActionImg = styled.img`
  margin-left: -30px;
  margin-top: 100px;
  z-index: 1;
  cursor: pointer;
`
const StyledInput = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
`
const StyledName = styled.p`
  color: #000;
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  margin-top: 43px;
`
const StyledEmail = styled.p`
  color: #000;
  font-family: Zen Kaku Gothic New;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  margin-top: 18px;
`
const StyledDivContainerEmail = styled.div`
  width: 200px;
  text-align: center;
  margin-bottom: 36px;
`
const StyledDivEmail = styled.div`
  /* margin-bottom: 32px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Buttons = styled.button`
  position: relative;
  left: -75px;
  background-color: transparent;
  margin-left: -25px;
  border: none;
  z-index: 20;
`
const Div = styled.div`
  position: relative;
  top: -50px;
  left: -75px;
  margin-left: -45px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  z-index: 2;
`
const ButtonDiv = styled.div`
  margin-top: 20px;
`
const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`
