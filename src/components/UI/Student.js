/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const Student = ({
  variant,
  UserDataArray,
  onClickStudentGroupButton,
  onClickStudentPaidButton,
  onClickStudentNotPaidButton,
  onClickStudentUnlockButton,
  onClickStudentBlockButton,
  onClickInstructorGroupButton,
  onClickInstructorUnlockButton,
  onClickInstructorBlockButton,
  onClickManagerBlockButton,
  onClickManagerDeleteButton,
  onClickMentorDeleteButton,
  onClickElement,
  variantClick,
  onClickImgName,
  variantName,
}) => {
  return (
    <div>
      <StyledList>
        <StyledTable variant={variant}>
          <thead>
            <StyledHead variant={variant}>
              <StyledNamber>№</StyledNamber>
              {variant === 'Students' && <StyledFullName>Аты</StyledFullName>}
              {variant === 'Instructors' && (
                <StyledFullName>Почтасы</StyledFullName>
              )}
              {variant === 'mentor/instructors' && (
                <StyledFullName>Аты</StyledFullName>
              )}
              {variant === 'Staff_admin' && (
                <StyledFullName>Аты</StyledFullName>
              )}
              {variant === 'Manager_staff-admin' && (
                <StyledFullName>Аты</StyledFullName>
              )}
              {variant === 'User_Group' && (
                <StyledFullName variant={variant}>Аты</StyledFullName>
              )}
              {variant === 'Manager_Group' && (
                <StyledFullName variant={variant}>Аты</StyledFullName>
              )}
              {variant === 'Seo_admin_managers' && (
                <StyledFullName variant={variant}>Аты</StyledFullName>
              )}
              {variant === 'Seo_admin_group' && (
                <StyledFullName variant={variant}>Аты</StyledFullName>
              )}
              {variant === 'Instructors' && (
                <StyledDoctrine>Сабактар</StyledDoctrine>
              )}
              {variant === 'Staff_admin' && (
                <StyledDoctrine variant={variant}>Сабактар</StyledDoctrine>
              )}
              {variant === 'User_Group' && (
                <StyledScore variant={variant}>Упай</StyledScore>
              )}
              {variant === 'mentor/instructors' && (
                <StyledScore variant={variant}>Упай</StyledScore>
              )}
              {variant === 'Students' && <StyledGrup>Тайпасы</StyledGrup>}
              {variant === 'Instructors' && (
                <StyledDateofregistration>
                  Катталган күнү
                </StyledDateofregistration>
              )}
              {variant === 'Manager_Group' && (
                <StyledDateofregistration variant={variant}>
                  Катталган күнү
                </StyledDateofregistration>
              )}
              {variant === 'Students' && (
                <StyledDateofregistration>
                  Катталган күнү
                </StyledDateofregistration>
              )}
              {variant === 'Staff_admin' && (
                <>
                  <StyledDateofregistrationa variant={variant}>
                    Катталган күнү
                  </StyledDateofregistrationa>
                  <StyledDateofregistrations variant={variant}>
                    Катталган күнү
                  </StyledDateofregistrations>
                </>
              )}
              {variant === 'Manager_staff-admin' && (
                <StyledDateofregistration variant={variant}>
                  Катталган күнү
                </StyledDateofregistration>
              )}
              {variant === 'Seo_admin_managers' && (
                <>
                  <StyledDateofregistrationa variant={variant}>
                    Катталган күнү
                  </StyledDateofregistrationa>
                  <StyledDateofregistrations variant={variant}>
                    Катталган күнү
                  </StyledDateofregistrations>
                </>
              )}
              {variant === 'Seo_admin_group' && (
                <>
                  <StyledDateofregistrationa variant={variant}>
                    Катталган күнү
                  </StyledDateofregistrationa>
                  <StyledDateofregistrations variant={variant}>
                    Катталган күнү
                  </StyledDateofregistrations>
                </>
              )}
              {variant === 'Students' && <StyledPayments>Төлөм</StyledPayments>}
              {variant === 'Instructors' && (
                <StyledAction>Аракеттер</StyledAction>
              )}
              {variant === 'Manager_staff-admin' && (
                <StyledAction>Аракеттер</StyledAction>
              )}
              {variant === 'Students' && <StyledAction>Аракеттер</StyledAction>}
              {variant === 'Manager_Group' && (
                <StyledAction>Аракеттер</StyledAction>
              )}
              {variant === 'mentor/instructors' && (
                <span>
                  <StyledAction>Аракеттер</StyledAction>
                </span>
              )}
            </StyledHead>
          </thead>
          <tbody>
            {UserDataArray.map((element) => (
              <StyledBody
                key={element.id}
                variant={variant}
                onClick={() =>
                  variantClick === 'disbled' ? '' : onClickElement(element)
                }
              >
                {variant === 'Students' && (
                  <StyledId>{element.raiting}</StyledId>
                )}
                {variant === 'Instructors' && (
                  <StyledId>{element.raiting}</StyledId>
                )}
                {variant === 'Manager_staff-admin' && (
                  <StyledId>{element.raiting}</StyledId>
                )}
                {variant === 'Staff_admin' && (
                  <StyledId>{element.raiting}</StyledId>
                )}
                {variant === 'Seo_admin_managers' && (
                  <StyledId>{element.raiting}</StyledId>
                )}
                {variant === 'Seo_admin_group' && (
                  <StyledId>{element.raiting}</StyledId>
                )}
                {variant === 'User_Group' && (
                  <StyledId
                    style={{
                      background:
                        element.raiting === 1
                          ? 'rgba(255, 215, 0, 0.20)'
                          : '' || element.raiting === 2
                          ? 'rgba(154, 154, 154, 0.20)'
                          : '' || element.raiting === 3
                          ? 'rgba(205, 127, 50, 0.20)'
                          : '',
                      border:
                        element.raiting === 1
                          ? '3px solid #ffd700'
                          : '' || element.raiting === 2
                          ? '3px solid #9A9A9A'
                          : '' || element.raiting === 3
                          ? '3px solid #CD7F32'
                          : '',
                      color:
                        element.raiting === 1
                          ? '#FFD700'
                          : '' || element.raiting === 2
                          ? '#9A9A9A'
                          : '' || element.raiting === 3
                          ? '#CD7F32'
                          : '',
                    }}
                  >
                    {element.raiting}
                  </StyledId>
                )}
                {variant === 'Manager_Group' && (
                  <StyledId
                    style={{
                      background:
                        element.raiting === 1
                          ? 'rgba(255, 215, 0, 0.20)'
                          : '' || element.raiting === 2
                          ? 'rgba(154, 154, 154, 0.20)'
                          : '' || element.raiting === 3
                          ? 'rgba(205, 127, 50, 0.20)'
                          : '',
                      border:
                        element.raiting === 1
                          ? '3px solid #ffd700'
                          : '' || element.raiting === 2
                          ? '3px solid #9A9A9A'
                          : '' || element.raiting === 3
                          ? '3px solid #CD7F32'
                          : '',
                      color:
                        element.raiting === 1
                          ? '#FFD700'
                          : '' || element.raiting === 2
                          ? '#9A9A9A'
                          : '' || element.raiting === 3
                          ? '#CD7F32'
                          : '',
                    }}
                  >
                    {element.raiting}
                  </StyledId>
                )}
                {variant === 'mentor/instructors' && (
                  <StyledId
                    style={{
                      background:
                        element.raiting === 1
                          ? 'rgba(255, 215, 0, 0.20)'
                          : '' || element.raiting === 2
                          ? 'rgba(154, 154, 154, 0.20)'
                          : '' || element.raiting === 3
                          ? 'rgba(205, 127, 50, 0.20)'
                          : '',
                      border:
                        element.raiting === 1
                          ? '3px solid #ffd700'
                          : '' || element.raiting === 2
                          ? '3px solid #9A9A9A'
                          : '' || element.raiting === 3
                          ? '3px solid #CD7F32'
                          : '',
                      color:
                        element.raiting === 1
                          ? '#FFD700'
                          : '' || element.raiting === 2
                          ? '#9A9A9A'
                          : '' || element.raiting === 3
                          ? '#CD7F32'
                          : '',
                    }}
                  >
                    {element.raiting}
                  </StyledId>
                )}
                {variant === 'Students' && (
                  <StyledName
                    onClick={() =>
                      variantName === 'disbled' ? '' : onClickImgName(element)
                    }
                  >
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Instructors' && (
                  <StyledName
                    onClick={() =>
                      variantName === 'disbled' ? '' : onClickImgName(element)
                    }
                  >
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'mentor/instructors' && (
                  <StyledName>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Manager_staff-admin' && (
                  <StyledName>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Staff_admin' && (
                  <StyledName>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'User_Group' && (
                  <StyledName variant={variant}>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Manager_Group' && (
                  <StyledName variant={variant}>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Seo_admin_managers' && (
                  <StyledName variant={variant}>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Seo_admin_group' && (
                  <StyledName variant={variant}>
                    <StyledImg src={element.img} alt='error img' />
                    {element.name}
                  </StyledName>
                )}
                {variant === 'Instructors' && (
                  <StyledDoctrines>
                    {element.group}

                    {element.doctrine.length > 0 && <Ps>/</Ps>}
                    {element.doctrine.length > 0 && (
                      <StyleddoctrineDiv doctrine={element.doctrine}>
                        {element.doctrine.map((doctrine) => (
                          <StyledDoctrinesP>{doctrine}</StyledDoctrinesP>
                        ))}
                      </StyleddoctrineDiv>
                    )}
                    <StyledDivButton variant={variant}>
                      <Button
                        onClick={() => onClickInstructorGroupButton(element)}
                        variant='Add-Button'
                      >
                        +
                      </Button>
                    </StyledDivButton>
                  </StyledDoctrines>
                )}
                {variant === 'Staff_admin' && (
                  <StyledDoctrines variant={variant}>
                    {element.group}
                    {element.doctrine.length > 0 && <Ps>/</Ps>}
                    {element.doctrine.length > 0 && (
                      <StyleddoctrineDiv doctrine={element.doctrine}>
                        {element.doctrine.map((doctrine) => (
                          <StyledStaffdoctrine>{doctrine}</StyledStaffdoctrine>
                        ))}
                      </StyleddoctrineDiv>
                    )}
                  </StyledDoctrines>
                )}
                {variant === 'Students' && (
                  <StyledGrup>
                    {element.group ? (
                      element.group
                    ) : (
                      <Button
                        onClick={() => onClickStudentGroupButton(element)}
                        variant='Add-Button'
                      >
                        +
                      </Button>
                    )}
                  </StyledGrup>
                )}
                {variant === 'User_Group' && (
                  <StyledScores variant={variant}>{element.score}</StyledScores>
                )}
                {variant === 'mentor/instructors' && (
                  <StyledScores variant={variant}>{element.score}</StyledScores>
                )}
                {variant === 'Manager_Group' && (
                  <StyledDate variant={variant}>
                    {element.dateOfRegistration}
                  </StyledDate>
                )}
                {variant === 'Students' && (
                  <StyledDate variant={variant}>
                    {element.dateOfRegistration}
                  </StyledDate>
                )}
                {variant === 'Instructors' && (
                  <StyledDate>{element.dateOfRegistration}</StyledDate>
                )}
                {variant === 'Manager_staff-admin' && (
                  <StyledDate variant={variant}>
                    {element.dateOfRegistration}
                  </StyledDate>
                )}
                {variant === 'Staff_admin' && (
                  <StyledDate>{element.dateOfRegistration}</StyledDate>
                )}
                {variant === 'Seo_admin_managers' && (
                  <StyledDate variant={variant}>
                    {element.dateOfRegistration}
                  </StyledDate>
                )}
                {variant === 'Seo_admin_group' && (
                  <StyledDate variant={variant}>
                    {element.dateOfRegistration}
                  </StyledDate>
                )}
                {variant === 'Students' && (
                  <td>
                    {element.payment === true && (
                      <Button
                        onClick={() => onClickStudentPaidButton(element)}
                        variant='not paid'
                      >
                        <P>Төлөнбөдү</P>
                      </Button>
                    )}
                    {element.payment === false && (
                      <Button
                        onClick={() => onClickStudentNotPaidButton(element)}
                        variant='paid'
                      >
                        <P>Төлөндү</P>
                      </Button>
                    )}
                  </td>
                )}
                {variant === 'Students' && (
                  <StyledActions>
                    {element.action === false && (
                      <Button
                        onClick={() => onClickStudentBlockButton(element)}
                        variant='ActionBlock-Button'
                      >
                        <P>Кулпулоо</P>
                      </Button>
                    )}
                    {element.action === true && (
                      <Button
                        onClick={() => onClickStudentUnlockButton(element)}
                        variant='ActionUnlock-Button'
                      >
                        <P>Ачуу</P>
                      </Button>
                    )}
                  </StyledActions>
                )}
                {variant === 'Instructors' && (
                  <StyledActions>
                    {element.action === false && (
                      <Button
                        onClick={() => onClickInstructorBlockButton(element)}
                        variant='ActionBlock-Button'
                      >
                        <P>Кулпулоо</P>
                      </Button>
                    )}
                    {element.action === true && (
                      <Button
                        onClick={() => onClickInstructorUnlockButton(element)}
                        variant='ActionUnlock-Button'
                      >
                        <P>Ачуу</P>
                      </Button>
                    )}
                  </StyledActions>
                )}
                {variant === 'Manager_staff-admin' && (
                  <StyledActions>
                    <Button
                      onClick={() => onClickManagerBlockButton(element)}
                      variant='ActionBlock-Button'
                    >
                      <P>Өчүрүү</P>
                    </Button>
                  </StyledActions>
                )}
                {variant === 'Manager_Group' && (
                  <StyledActions
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ marginLeft: '27px', background: 'none' }}>
                      <Button
                        onClick={() => onClickManagerDeleteButton(element)}
                        variant='delete button'
                      />
                    </span>
                  </StyledActions>
                )}
                {variant === 'mentor/instructors' && (
                  <td>
                    <StyledActions
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ marginLeft: '27px', background: 'none' }}>
                        <Button
                          onClick={() => onClickMentorDeleteButton(element)}
                          variant='delete button'
                        />
                      </span>
                    </StyledActions>
                  </td>
                )}
              </StyledBody>
            ))}
          </tbody>
        </StyledTable>
      </StyledList>
    </div>
  )
}

export default Student

const SeoAdminManagers = (props) => {
  return props.variant === 'Seo_admin_managers'
    ? '@media screen and (min-width: 391px) {margin-right: 500px ;}'
    : ''
}
const SeoAdminGroup = (props) => {
  return props.variant === 'Seo_admin_group'
    ? '467px;margin-left:180px; @media screen and (max-width: 391px) { width: 95px; margin-left: 20px; font-family: Zen Kaku Gothic New; font-size: 14px; font-style: normal; line-height: normal; }'
    : '167px'
}
const SeoAdminManagerss = (props) => {
  return (
    props.variant === 'Seo_admin_managers' &&
    ' @media screen and (max-width: 391px) { width: 95px; margin: 0; margin-left: 20px; font-family: Zen Kaku Gothic New; font-size: 14px; font-style: normal; line-height: normal; }'
  )
}
const UserScores = (props) => {
  return props.variant === 'User_Group'
    ? ' @media screen and (max-width: 391px) { width: 95px; margin: 0; margin-left: 20px; font-family: Zen Kaku Gothic New; font-size: 14px; font-style: normal; line-height: normal; }'
    : ''
}
const StaffAdmin = (props) => {
  return props.variant === 'Staff_admin' ? '375px; margin-left: 40px;' : '255px'
}
const Instructor = (props) => {
  return props.variant === 'Instructors' ? 'margin-left: 10px;' : ''
}
const UserGroup = (props) => {
  return props.variant === 'User_Group'
    ? 'margin-right: 350px; margin-left: 150px;'
    : ''
}
const handlerDateOfregistrations = (props) => {
  return props.variant === 'Manager_Group'
    ? 'margin-right: 230px; margin-left: 70px;'
    : ''
}
const MentorIsntructors = (props) => {
  return props.variant === 'mentor/instructors'
    ? 'margin-right: 230px; margin-left: 110px;'
    : ''
}
const ManagerStaffAdmin = (props) => {
  return props.variant === 'Manager_staff-admin'
    ? 'margin-right: 220px; margin-left: 100px;'
    : ''
}
const SeoAdminGroups = (props) => {
  return props.variant === 'Seo_admin_group'
    ? 'width: 370px;'
    : props.variant === 'Seo_admin_managers'
    ? 'width: 370px;'
    : props.variant === 'User_Group'
    ? 'width: 370px'
    : ''
}
const SeoAdminFullName = (props) => {
  return (
    props.variant === 'Seo_admin_group' &&
    'width: 320px; margin-left: 20px; display:flex; align-items: center; font-family: Zen Kaku Gothic New; font-size: 14px; font-style: normal; font-weight: 700; line-height: normal;'
  )
}
const SeoAdminFullNames = (props) => {
  return (
    props.variant === 'Seo_admin_managers' &&
    'width: 320px; margin-left:20px; display:flex; align-items: center; font-family: Zen Kaku Gothic New; font-size: 14px; font-style: normal; font-weight: 700; line-height: normal;'
  )
}
const StyledList = styled.div`
  width: 1020px;
  @media (max-width: 391px) {
    ${SeoAdminGroups}
    width: 100%;
    overflow-x: scroll;
  }
`
const StyledTable = styled.table`
  text-align: start;
  width: 950px;
  @media screen and (max-width: 391px) {
    ${SeoAdminGroups}
  }
`
const StyledHead = styled.tr`
  width: 950px;
  height: 29px;
  font-family: 'Zen Kaku Gothic New' sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: #134764;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (max-width: 391px) {
    ${SeoAdminGroups}
  }
`
const StyledNamber = styled.th`
  width: 25px;
  height: 29px;
  padding: 0;
`
const StyledFullName = styled.th`
  text-align: start;
  width: 230px;
  height: 29px;
  padding: 0;
  ${SeoAdminManagers}
  @media screen and (max-width: 391px) {
    padding: 0;
    ${SeoAdminFullNames}
    ${SeoAdminFullName}
  }
`
const StyledDoctrine = styled.th`
  text-align: start;
  width: ${StaffAdmin};
  height: 29px;
  padding: 0;
`
const StyledScore = styled.th`
  text-align: start;
  width: 72px;
  height: 29px;
  padding: 0;
  ${UserGroup}
  ${MentorIsntructors}
  ${UserScores}
`
const StyledGrup = styled.th`
  text-align: start;
  width: 143px;
  height: 29px;
  padding: 0;
`
const StyledDateofregistration = styled.th`
  text-align: start;
  width: ${SeoAdminGroup};
  ${SeoAdminManagerss};
  height: 29px;
  padding: 0;
  ${handlerDateOfregistrations}
  ${ManagerStaffAdmin}
  font-size: 20px;
  font-weight: 700;
`
const StyledDateofregistrationa = styled.th`
  @media screen and (max-width: 391px) {
    display: none;
  }
  text-align: start;
  width: ${SeoAdminGroup};
  ${SeoAdminManagerss};
  height: 29px;
  padding: 0;
  ${handlerDateOfregistrations}
  ${ManagerStaffAdmin}
  color: rgba(19, 71, 100, 1);
  font-weight: 700;
`
const StyledDateofregistrations = styled.th`
  @media screen and (min-width: 391px) {
    display: none;
  }
  text-align: start;
  width: ${SeoAdminGroup};
  ${SeoAdminManagerss};
  height: 29px;
  padding: 0;
  ${handlerDateOfregistrations}
  ${ManagerStaffAdmin}
  color: rgba(19, 71, 100, 1);
  font-weight: 700;
`
const StyledPayments = styled.th`
  text-align: start;
  width: 120px;
  height: 29px;
  padding: 0;
`
const StyledAction = styled.th`
  text-align: start;
  width: 120px;
  height: 29px;
  padding: 0;
`

const StyledBody = styled.tr`
  width: 950px;
  height: 40px;
  font-family: 'Zen Kaku Gothic New';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: #373737;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0;
  @media screen and (max-width: 391px) {
    ${SeoAdminGroups}
  }
`
const StyledId = styled.td`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  margin-top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`
const StyledName = styled.td`
  width: 230px;
  height: 23px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  ${SeoAdminManagers}
  @media screen and (max-width: 391px) {
    ${SeoAdminFullNames}
    ${SeoAdminFullName}
  }
`
const StyledDoctrines = styled.td`
  text-align: start;
  width: ${StaffAdmin};
  min-width: 120px;
  height: 23px;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-family: Zen Kaku Gothic New;
  font-weight: 500;
  color: rgba(55, 55, 55, 1);
  display: flex;
  align-items: center;
`
const StyledStaffdoctrine = styled.p`
  font-size: 16px;
  font-family: Zen Kaku Gothic New;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: rgba(135, 135, 135, 1);
`
const StyleddoctrineDiv = styled.div`
  width: ${({ doctrine }) =>
    doctrine.length > 1 && '120px; word-break: break-all; overflow-y: scroll;'};
  height: 22px;
  overflow-x: none;
`
const Ps = styled.p`
  margin: 0px 5px 0 5px;
`
const StyledDoctrinesP = styled.p`
  display: block;
  font-size: 14px;
  margin-top: 3px;
  margin-left: 4px;
  font-family: Zen Kaku Gothic New;
  font-weight: 400;
  color: rgba(135, 135, 135, 1);
`
const StyledScores = styled.td`
  text-align: start;
  width: 72px;
  height: 29px;
  padding: 0;
  font-size: 16px;
  font-family: Zen Kaku Gothic New;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  ${UserGroup}
  ${MentorIsntructors}
  ${UserScores}
`
const StyledDate = styled.td`
  width: ${SeoAdminGroup};
  ${SeoAdminManagerss};
  height: 23px;
  ${handlerDateOfregistrations}
  ${ManagerStaffAdmin}
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  font-size: 16px;
  word-break: break-all;
`
const StyledImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
  @media screen and (max-width: 391px) {
    width: 30px;
    height: 30px;
  }
`
const StyledActions = styled.td`
  width: 120px;
  text-align: start;
  margin: 0;
  padding: 0;
`
const StyledDivButton = styled.span`
  ${Instructor}
`
const P = styled.p`
  color: var(--white, #fff);
  text-align: center;
  font-family: Zen Kaku Gothic New;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media screen and (max-width: 415px) {
    color: var(--white, #fff);
    text-align: center;
    font-family: Zen Kaku Gothic New;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: 20px;
  }
`
