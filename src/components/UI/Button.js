import React from 'react'
import styled from 'styled-components'
import CreateGroup from '../../assets/icon/button-icons/add.svg'
import EditButton from '../../assets/icon/button-icons/edit.svg'
import DeleteButton from '../../assets/icon/button-icons/trash.svg'

const Button = ({ children, variant, onClick, ...props }) => {
  return (
    <div>
      <StyledButton variant={variant} onClick={onClick} {...props}>
        {variant === 'edit button' && (
          <DeleteIcon src={EditButton} alt='error-DeleteButton.svg' />
        )}
        {variant === 'delete button' && (
          <ChangeIcon src={DeleteButton} alt='error-EditButton.svg' />
        )}
        {variant === 'create group' && (
          <CreateGroupIcon src={CreateGroup} alt='error-CreateGroup.svg' />
        )}
        {variant === 'Add' && (
          <CreateGroupIcon src={CreateGroup} alt='error-CreateGroup.svg' />
        )}
        {children}
      </StyledButton>
    </div>
  )
}

export default Button

const getStyleButton = (props) => {
  return (
    props.variant === 'sing in' &&
    'width:340px; background-color:#134764; height:40px;'
  )
}
const getPaidButton = (props) => {
  return (
    props.variant === 'not paid' &&
    'width:120px; height:38px; background-color:#dc3545;'
  )
}
const getNotPaidButton = (props) => {
  return (
    props.variant === 'paid' &&
    'width:120px; height:38px; background-color:#134764;'
  )
}
const getBlockButton = (props) => {
  return (
    props.variant === 'ActionBlock-Button' &&
    'width:120px; background-color:#dc3545; height:38px;'
  )
}
const getUnlockButton = (props) => {
  return (
    props.variant === 'ActionUnlock-Button' &&
    'width:120px; background-color:#134764; height:38px;'
  )
}
const getGroupButton = (props) => {
  return (
    props.variant === 'group' &&
    'width:340px; background-color:#134764; height:38px;'
  )
}
const getDoctrineButton = (props) => {
  return (
    props.variant === 'Doctrine' &&
    'width:350px; background-color:#134764; height:40px;'
  )
}
const getDoctrinePageButton = (props) => {
  return (
    props.variant === 'Doctrine page' &&
    'width:244px; background-color:#134764; height:38px;'
  )
}
const getAddButton = (props) => {
  return (
    props.variant === 'Add-Button' &&
    'width:38px; height:38px; background-color:#134764;'
  )
}
const getDeleteButton = (props) => {
  return (
    props.variant === 'delete button' &&
    'width:20px; height:23px; background-color: rgba( 255, 255, 255, 0.5) ;'
  )
}
const getChangeButton = (props) => {
  return (
    props.variant === 'edit button' &&
    'width:20px; height:21px; background-color: rgba( 255, 255, 255, 0.5) ;'
  )
}
const getRequestRefusalButton = (props) => {
  return (
    props.variant === 'RequestRefusal-Buttons' &&
    'width:120px; height:38px; background-color:#dc3545;'
  )
}
const getRequestAllowButton = (props) => {
  return (
    props.variant === 'RequestAllow-Buttons' &&
    'width:120px; height:38px; background-color:#134764;'
  )
}
const getHomeWorkButton = (props) => {
  return (
    props.variant === 'home-work' &&
    'width:340px; background-color:#134764; height:40px;'
  )
}
const getCreateGroup = (props) => {
  return (
    props.variant === 'create group' &&
    'width:190px; background-color:#134764; height:40px;'
  )
}
const getCreateGroupPage = (props) => {
  return (
    props.variant === 'create group-page' &&
    'width:350px; background-color:#134764; height:40px;'
  )
}
const getSeoAdminButton = (props) => {
  return (
    props.variant === 'seo/admin' &&
    'width:350px; background-color:#134764; height:40px;'
  )
}
const getManagerNotificationAllow = (props) => {
  return (
    props.variant === 'allow' &&
    'width: 120px; height: 38px; background-color: rgba(224, 224, 224, 1);'
  )
}
const getLogoutButton = (props) => {
  return (
    props.variant === 'logout' &&
    'width:250px; background-color:#DC3545; height:40px;'
  )
}
// media
const getStyleMediaButton = (props) => {
  return (
    props.variant === 'sing in' &&
    'width:296px; background-color:#134764; height:40px;'
  )
}
const getPaidMediaButton = (props) => {
  return (
    props.variant === 'paid' &&
    'width:91px; background-color:#134764; height:30px;'
  )
}
const getNotPaidMediaButton = (props) => {
  return (
    props.variant === 'not paid' &&
    'width:91px; background-color:#dc3545; height:30px;'
  )
}
const getActionBlockMediaButton = (props) => {
  return (
    props.variant === 'ActionBlock-Button' &&
    'width:99px; height:30px; background-color:#dc3545;'
  )
}
const getActionUnlockMediaButton = (props) => {
  return (
    props.variant === 'ActionUnlock-Button' &&
    'width:99px; height:30px; background-color:#1234764;'
  )
}
const getGroupMediaButton = (props) => {
  return (
    props.variant === 'group' &&
    'width:326px; background-color:#134764; height:38px;'
  )
}
const getDoctrineMediaButton = (props) => {
  return (
    props.variant === 'Doctrine' &&
    'width:350px; background-color:#134764; height:38px;'
  )
}
const getDoctrinePageMediaButton = (props) => {
  return (
    props.variant === 'Doctrine page' &&
    'width:350px; background-color:#134764; height:38px;'
  )
}
const getGroupSearchMediaButton = (props) => {
  return (
    props.variant === 'create group' &&
    'width:40px;  background-color:#134764; height:40px;'
  )
}
const getAddMediaButton = (props) => {
  return (
    props.variant === 'Add-Button' &&
    'width:30px; height:30px; background-color:#134764;'
  )
}
const getRequestRefusalMediaButton = (props) => {
  return (
    props.variant === 'RequestRefusal-Buttons' &&
    'width:144px; height:38px; background:#DC3545;'
  )
}
const getRequestAllowMediaButton = (props) => {
  return (
    props.variant === 'RequestAllow-Buttons' &&
    'width:144px; height:38px; background:#134764;'
  )
}
const getHomeWorkButtonMedia = (props) => {
  return (
    props.variant === 'home-work' &&
    'width:329px; background-color:#134764; height:40px;'
  )
}
const getSeoAdminMediaButton = (props) => {
  return (
    props.variant === 'seo/admin' &&
    'width:315px; background-color:#134764; height:40px;'
  )
}
const getManagerNotificationMediaAllow = (props) => {
  return props.variant === 'allow' && 'width: 144px; height: 38px'
}
const StyledButton = styled.button`
  ${getStyleButton}
  ${getBlockButton}
    ${getUnlockButton}
    ${getGroupButton}
    ${getDoctrineButton}
    ${getDoctrinePageButton}
    ${getAddButton}
    ${getDeleteButton}
    ${getChangeButton}
   ${getRequestRefusalButton}
   ${getRequestAllowButton}
   ${getHomeWorkButton}
   ${getCreateGroup}
   ${getCreateGroupPage}
   ${getPaidButton}
   ${getNotPaidButton}
   ${getSeoAdminButton}
   ${getManagerNotificationAllow}
   ${getLogoutButton}
  @media screen and (max-width:415px) {
    ${getStyleMediaButton}
    ${getPaidMediaButton}
    ${getNotPaidMediaButton}
    ${getActionBlockMediaButton}
    ${getActionUnlockMediaButton}
    ${getGroupMediaButton}
    ${getDoctrineMediaButton}
    ${getDoctrinePageMediaButton}
    ${getGroupSearchMediaButton}
    ${getAddMediaButton}
    ${getRequestRefusalMediaButton}
    ${getRequestAllowMediaButton}
    ${getHomeWorkButtonMedia}
    ${getDeleteButton}
    ${getChangeButton}
   ${getCreateGroupPage}
   ${getSeoAdminMediaButton}
   ${getManagerNotificationMediaAllow}
  }
  @media screen and (max-width: 390px) {
    ${getStyleMediaButton}
    ${getPaidMediaButton}
    ${getNotPaidMediaButton}
    ${getActionBlockMediaButton}
    ${getActionUnlockMediaButton}
    ${getGroupMediaButton}
    ${getDoctrineMediaButton}
    ${getDoctrinePageMediaButton}
    ${getGroupSearchMediaButton}
    ${getAddMediaButton}
    ${getRequestRefusalMediaButton}
    ${getRequestAllowMediaButton}
    ${getHomeWorkButtonMedia}
    ${getDeleteButton}
   ${getCreateGroupPage}
   ${getChangeButton}
   ${getSeoAdminMediaButton}
   ${getManagerNotificationMediaAllow}
  }
  @media screen and (max-width: 375px) {
    ${getStyleMediaButton}
    ${getPaidMediaButton}
    ${getNotPaidMediaButton}
    ${getActionBlockMediaButton}
    ${getActionUnlockMediaButton}
    ${getGroupMediaButton}
    ${getDoctrineMediaButton}
    ${getGroupSearchMediaButton}
    ${getAddMediaButton}
    ${getRequestRefusalMediaButton}
    ${getRequestAllowMediaButton}
    ${getHomeWorkButtonMedia}
   ${getCreateGroupPage}
    ${getDeleteButton}
    ${getChangeButton}
   ${getSeoAdminMediaButton}
   ${getManagerNotificationMediaAllow}
  }
  font-family: 'Zen Kaku Gothic New';
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  border: none;
  border-radius: 6px;
  padding: 0;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DeleteIcon = styled.img`
  width: 19px;
  height: 22px;
`
const ChangeIcon = styled.img`
  width: 19px;
  height: 20px;
`
const CreateGroupIcon = styled.img`
  width: ${({ variant }) => {
    return variant === 'Add' ? '10px' : '14px'
  }};
  height: ${({ variant }) => {
    return variant === 'Add' ? '10px' : '14px'
  }};
  flex-shrink: 0;
  @media screen and (min-width: 391px) {
    margin-top: 5px;
    margin-left: -15px;
    margin-right: 15px;
  }
`
