import { useState } from 'react'
import styled from 'styled-components'
import showIcon from '../../assets/icon/notificationIcons/Frame 131.svg'
import emailIcon from '../../assets/icon/notificationIcons/sms.svg'
import Button from './Button'
import Input from './Input'
import BasikSelect from './Select'

const Notifications = ({
  selectArray,
  variant,
  index,
  mentorData,
  studentData,
  managerData,
  handlerAllowAccess,
  selectstate,
  selectIndex,
  setSelectIndex,
  setSelectState,
  handlerBlockUser,
  sendButtonClick,
  scoreInputHandler,
  commentInputHandler,
}) => {
  const [showStudentNotifications, setShowStudentNotifications] =
    useState(false)
  const [mentorShow, setMentorShow] = useState(false)
  const show = () => {
    setShowStudentNotifications((prev) => !prev)
  }
  const showMentor = () => {
    setMentorShow((prev) => !prev)
  }
  const changeSelect = (event) => {
    if (selectstate === index) {
      setSelectState(null)
    } else {
      setSelectState(event)
      setSelectIndex(index)
    }
  }
  return (
    <Container>
      {variant === 'StudentNotifications' && (
        <StudentNotificationsBlock>
          <StudentNotificationsLeftBlock>
            <StudentNotificationsName>
              {studentData.name !== 'менеджер' ? 'Тапшырма:' : ''}
              <StudentNotificationsValue days={studentData?.days}>
                {studentData.name !== 'менеджер'
                  ? `${
                      showStudentNotifications
                        ? studentData?.value
                        : `${
                            window.innerWidth < 415
                              ? studentData?.value
                              : studentData?.value
                          }`
                    }`
                  : studentData?.value}
              </StudentNotificationsValue>
            </StudentNotificationsName>
            <StudentNotificationsName>
              {studentData.name !== 'менеджер' ? 'Пикир:' : 'менеджер'}
              <StudentNotificationsValue days={studentData?.days}>
                {studentData?.name !== 'менеджер'
                  ? `${
                      showStudentNotifications
                        ? studentData?.commentValue
                        : `${
                            window.innerWidth < 415
                              ? studentData?.commentValue
                              : studentData?.commentValue
                          }`
                    }`
                  : studentData.commentValue}
              </StudentNotificationsValue>
            </StudentNotificationsName>
          </StudentNotificationsLeftBlock>
          {studentData.name !== 'менеджер' && (
            <StudentNotificationsRightBlock>
              <StudentNotificationsScore score={studentData.score}>
                {studentData.score} Упай
              </StudentNotificationsScore>
              {showStudentNotifications && (
                <div>
                  {!showStudentNotifications ? (
                    <StudentNotificationsShowIcon
                      onClick={show}
                      src={showIcon}
                      alt='none'
                    />
                  ) : (
                    <StudentNotificationsHideIcon
                      onClick={show}
                      src={showIcon}
                      alt='none'
                    />
                  )}
                </div>
              )}
            </StudentNotificationsRightBlock>
          )}
        </StudentNotificationsBlock>
      )}
      {variant === 'ManagerNotifications' && (
        <ManagerNotificationsBlock>
          <ManagerNotificationsLeftBlock>
            <ManagerNotificationsNumber>
              {managerData.number}
            </ManagerNotificationsNumber>
            <ManagerNotificationsUserBlock>
              <ManagerNotificationsUser>
                {managerData.username} / {managerData.nickname}
              </ManagerNotificationsUser>
              <ManagerNotificationsEmailBlock>
                <ManagerNotificationsEmailIcon src={emailIcon} alt='none' />
                <ManagerNotificationsEmail>
                  {managerData.email}
                </ManagerNotificationsEmail>
              </ManagerNotificationsEmailBlock>
            </ManagerNotificationsUserBlock>
            <ManagerNotificationsDate>
              {managerData.date}
            </ManagerNotificationsDate>
          </ManagerNotificationsLeftBlock>
          <ButtonsBlock>
            <BasikSelect
              variant=''
              label='Кызматтын тандаңыз'
              options={selectArray}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => (option.option ? option.option : '')}
              // value={selectstate}
              onChange={changeSelect}
            />
            <div style={{ display: 'flex', gap: '18px' }}>
              <Button
                variant='RequestRefusal-Buttons'
                onClick={() => handlerBlockUser(managerData)}
              >
                Кулпулоо
              </Button>
              {selectIndex !== index && (
                <Button variant='allow' disabled>
                  Уруксат берүү
                </Button>
              )}
              {selectIndex === index && (
                <Button
                  variant='RequestAllow-Buttons'
                  onClick={() => handlerAllowAccess(managerData)}
                >
                  Уруксат берүү
                </Button>
              )}
            </div>
          </ButtonsBlock>
        </ManagerNotificationsBlock>
      )}
      {variant === 'MentorNotifications' && (
        <MentorNotificationsBlock>
          <MentorNotificationsLeftBlock>
            <MentorNotificationsName>
              <MentorNotificationsGroup>
                {mentorData.group}
              </MentorNotificationsGroup>{' '}
              / {mentorData.lesson} / {mentorData.value}
            </MentorNotificationsName>
            <MentorNotificationsComment>
              {mentorData.type && (
                <MentorNotificationsCommentType>
                  <a href={mentorData.file}>{mentorData.type}</a>
                </MentorNotificationsCommentType>
              )}
              <span>
                {!mentorShow
                  ? mentorData.comment.slice(0, 50)
                  : mentorData.comment}
              </span>
            </MentorNotificationsComment>
          </MentorNotificationsLeftBlock>
          <div>
            <MentorNotificationsRightBlock>
              <MentorNotificationsUser>
                <ManagerNotificationsUser>
                  {mentorData.username} / {mentorData.nickname}
                </ManagerNotificationsUser>
                <ManagerNotificationsEmailBlock>
                  <ManagerNotificationsEmailIcon src={emailIcon} alt='none' />{' '}
                  <ManagerNotificationsEmail>
                    {mentorData.email}
                  </ManagerNotificationsEmail>
                </ManagerNotificationsEmailBlock>
              </MentorNotificationsUser>
              <MentorNotificationsDate>
                <ManagerNotificationsDate>
                  {mentorData.date}
                </ManagerNotificationsDate>
                <MentorNotificationIcon>
                  <div />
                  {!mentorShow && (
                    <MentorNotificationsShowIcon
                      onClick={showMentor}
                      src={showIcon}
                      alt='none'
                    />
                  )}
                </MentorNotificationIcon>
              </MentorNotificationsDate>
            </MentorNotificationsRightBlock>
            {mentorShow && (
              <div>
                <MentorInput>
                  <Input onChange={scoreInputHandler} placeholder='Балл' />
                </MentorInput>
                <Input
                  onChange={commentInputHandler}
                  placeholder='Комментарии'
                />
                <MentorButton>
                  <Button onClick={sendButtonClick} variant='seo/admin'>
                    Отправить
                  </Button>
                </MentorButton>
                <MentorNotificationIcon>
                  <div />
                  <MentorNotificationsHideIcon
                    onClick={showMentor}
                    src={showIcon}
                    alt='none'
                  />
                </MentorNotificationIcon>
              </div>
            )}
          </div>
        </MentorNotificationsBlock>
      )}
    </Container>
  )
}

export default Notifications
const Container = styled.div`
  @media screen and (max-width: 415px) {
    display: flex;
    justify-content: center;
  }
`
const StudentNotificationsBlock = styled.div`
  width: 1110px;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px #00000040;
  margin-bottom: 20px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 16px 22px 18px 18px;
  @media screen and (max-width: 415px) {
    width: 350px;
    display: block;
    border-radius: 8px;
  }
  @media screen and (max-width: 375px) {
    width: 310px;
  }
`
const ManagerNotificationsBlock = styled.div`
  width: 1110px;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px #00000040;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 18px 6px 11px;
  @media screen and (max-width: 415px) {
    width: 350px;
    border-radius: 8px;
    display: block;
    padding: 8px 12px 10px 11px;
  }
  @media screen and (max-width: 391px) {
    width: 350px;
    border-radius: 8px;
    display: block;
    padding: 8px 10px 10px 10px;
  }
  @media screen and (max-width: 375px) {
    width: 310px;
    border-radius: 8px;
    display: block;
    padding: 8px 10px 10px 10px;
  }
`
const MentorNotificationsBlock = styled.div`
  width: 1110px;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px #00000040;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 5px 15px 5px 15px;
  margin-bottom: 15px;
  @media screen and (max-width: 415px) {
    width: 350px;
    border-radius: 8px;
    display: block;
  }
  @media screen and (max-width: 391px) {
    width: 340px;
    border-radius: 8px;
    display: block;
  }
  @media screen and (max-width: 375px) {
    width: 320px;
    border-radius: 8px;
    display: block;
  }
`
const StudentNotificationsLeftBlock = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
`
const StudentNotificationsName = styled.span`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
  @media screen and (max-width: 415px) {
    width: auto;
  }
`
const StudentNotificationsValue = styled.span`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => props.days <= 5 && '#00CC0D;'}${(props) => props.days > 5 && '#DC3545'};
  margin-left: 24px;
  max-width: 450px;
  word-break: break-all;
  @media screen and (max-width: 415px) {
    margin-left: 20px;
    max-width: 200px;
  }
`
const StudentNotificationsRightBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 39px;
`
const StudentNotificationsScore = styled.p`
  width: 94px;
  height: 19px;
  border-radius: 4px;
  background: ${(props) => (props.score > 1 ? '#00cc0d;' : 'gray')};
  color: white;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  @media screen and (max-width: 415px) {
    margin-top: 6px;
  }
`
const StudentNotificationsShowIcon = styled.img`
  width: 13px;
  height: 13px;
  @media screen and (max-width: 415px) {
    margin-left: 200px;
    rotate: -90deg;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 391px) {
    margin-left: 200px;
    rotate: -90deg;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 375px) {
    margin-left: 180px;
    rotate: -90deg;
    margin-bottom: 10px;
  }
`
const StudentNotificationsHideIcon = styled.img`
  width: 13px;
  height: 13px;
  rotate: 180deg;
  @media screen and (max-width: 415px) {
    margin-left: 200px;
    rotate: 180deg;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 391px) {
    margin-left: 200px;
    rotate: 180deg;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 375px) {
    margin-left: 180px;
    rotate: 180deg;
    margin-bottom: 10px;
  }
`
const ManagerNotificationsLeftBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 30px;
  @media screen and (max-width: 415px) {
    gap: 22px;
  }
`
const ManagerNotificationsNumber = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  color: #134764;
  border: 1px solid #134764;
  width: 18px;
  height: 18px;
  text-align: center;
  border-radius: 200px;
  position: relative;
  top: 8px;
`
const ManagerNotificationsUserBlock = styled.div``
const ManagerNotificationsUser = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
`
const ManagerNotificationsEmailBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 150px;
`
const ManagerNotificationsEmail = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #878787;
`
const ManagerNotificationsEmailIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-top: 3px;
`
const ManagerNotificationsDate = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
  color: #949494;
  display: flex;
  flex-direction: column;
`
const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 3px;
  @media screen and (max-width: 415px) {
    justify-content: center;
    flex-direction: column;
    margin-top: 16px;
  }
`
const MentorNotificationsLeftBlock = styled.div``
const MentorNotificationsRightBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 75px;
  @media screen and (max-width: 415px) {
    display: block;
  }
`
const MentorNotificationsName = styled.div`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
  display: flex;
  gap: 5px;
`
const MentorNotificationsGroup = styled.h6`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
`
const MentorNotificationsComment = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737b2;
  max-width: 600px;
  word-wrap: break-word;
`
const MentorNotificationIcon = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 415px) {
    width: 155px;
  }
`

const MentorNotificationsShowIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-top: 8px;
  @media screen and (max-width: 415px) {
    rotate: -90deg;
    position: relative;
    bottom: 6px;
  }
`
const MentorNotificationsHideIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-left: 340px;
  margin-top: 20px;
  rotate: 180deg;
  @media screen and (max-width: 415px) {
    margin-left: 310px;
  }
  @media screen and (max-width: 391px) {
    margin-left: 300px;
  }
  @media screen and (max-width: 375px) {
    margin-left: 310px;
  }
`
const MentorNotificationsDate = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 415px) {
    margin-top: 15px;
    gap: 95px;
    flex-direction: row;
  }
  margin-top: 15px;
  @media screen and (max-width: 391px) {
    gap: 85px;
    flex-direction: row;
  }
  @media screen and (max-width: 375px) {
    margin-top: 15px;
    gap: 75px;
    flex-direction: row;
  }
`
const MentorNotificationsUser = styled.div`
  @media screen and (max-width: 415px) {
    margin-top: 8px;
  }
`
const MentorButton = styled.div`
  margin-top: 24px;
  @media screen and (max-width: 415px) {
    margin-top: 56px;
  }
  @media screen and (max-width: 391px) {
    margin-top: 56px;
  }
`
const MentorInput = styled.div`
  margin-bottom: 15px;
  @media screen and (max-width: 415px) {
    margin-top: 46px;
    margin-bottom: 33px;
  }
`
const MentorNotificationsCommentType = styled.span`
  background: #d9d9d9;
  font-size: 10px;
  padding: 2px 18px 2px 19px;
  border-radius: 3px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
  margin-right: 11px;
  margin-top: 3px;
`
