import React, { forwardRef } from 'react'
import styled from 'styled-components'
import searchIcon from '../../assets/icon/search.svg'

const Input = forwardRef(function Input(props, ref) {
  return (
    <div>
      <StyledDiv variant={props.variant}>
        {props.variant === 'adds-search' ? (
          <StyledImg src={searchIcon} alt='search error img' />
        ) : (
          ''
        )}
        {props.variant === 'add Search' ? (
          <StyledImg src={searchIcon} alt='search error img' />
        ) : (
          ''
        )}
        <StyledInput
          ref={ref}
          variant={props.variant}
          {...props}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
        />
      </StyledDiv>
    </div>
  )
})

export default Input

const getBorderAddSearchs = (props) => {
  return props.variant === 'add Search'
    ? 'border:1px solid #878787;border-radius:8px;width:370px;height:38px;'
    : ''
}
const getBorderAddSearch = (props) => {
  return props.variant === 'adds-search'
    ? 'border:1px solid #878787;border-radius:8px;width:370px;height:38px;'
    : getBorderAddSearchs
}
const getInputBorderSearch = (props) => {
  return props.variant === 'search'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : 'border-bottom:1px solid #878787;width: 340px;  font-family: "Zen Kaku Gothic New";font-style: normal;font-weight: 400;font-size: 14px;line-height: 20px;'
}
const getInputBorderAddsSearch = (props) => {
  return props.variant === 'adds-search'
    ? 'width: 330px;font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : getInputBorderSearch
}
const getInputBorderAddSearch = (props) => {
  return props.variant === 'add Search'
    ? 'width: 330px;font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : getInputBorderAddsSearch
}
const getInputCreategroup = (props) => {
  return props.variant === 'create-group'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; width: 350px; border-bottom:1px solid #878787;'
    : getInputBorderAddSearch
}
const getInputEnterLesson = (props) => {
  return props.variant === 'enter-lesson'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; width: 500px; border-bottom:1px solid #878787;'
    : getInputCreategroup
}
const getInputMentorInstructor = (props) => {
  return props.variant === 'mentor/instructor'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; width: 350px; border-bottom:1px solid #878787;'
    : getInputEnterLesson
}
const getMediaInput = (props) => {
  return props.variant === 'adds-search'
    ? 'width:260px; height:35px;font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : 'width:296px;height:35px;'
}
const getMediaInput2 = (props) => {
  return props.variant === 'add Search'
    ? 'width:310px; height:35px;font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : getMediaInput
}
const getInputCreategroupmedia = (props) => {
  return props.variant === 'create-group'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; width: 350px; border-bottom:1px solid #878787;'
    : getMediaInput2
}
const getInputMentorInstructorMedia = (props) => {
  return props.variant === 'mentor/instructor'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; width: 320px; border-bottom:1px solid #878787;'
    : getInputCreategroupmedia
}
const getInputEnterLessonmedia = (props) => {
  return props.variant === 'enter-lesson'
    ? 'font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; width: 300px; border-bottom:1px solid #878787;'
    : getInputMentorInstructorMedia
}
const getMediaAddSearch = (props) => {
  return props.variant === 'adds-search'
    ? 'border:1px solid #878787;border-radius:8px;width:300px;height:38px;font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : 'font-family: "Zen Kaku Gothic New";font-style: normal;font-weight: 400;font-size: 14px;line-height: 20px;'
}
const getMediaSearch = (props) => {
  return props.variant === 'add Search'
    ? 'border:1px solid #878787;border-radius:8px;width:350px;height:38px;font-family:"Roboto"; font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px;'
    : getMediaAddSearch
}
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 391px) {
    ${getMediaSearch}
  }
  ${getBorderAddSearch}
`
const StyledImg = styled.img`
  width: 13px;
  height: 13px;
  margin-left: 10px;
`
const StyledInput = styled.input`
  @media screen and (max-width: 391px) {
    ${getInputEnterLessonmedia}
  }
  outline: initial;
  height: 35px;
  border: none;
  ${getInputMentorInstructor};
  padding-left: 5px;
  margin-left: 5px;
`
