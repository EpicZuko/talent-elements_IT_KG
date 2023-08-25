import { useState } from 'react'
import styled from 'styled-components'
import Frame3 from '../../assets/icon/lessonIcons/_2759160148944.svg'
import Frame2 from '../../assets/icon/lessonIcons/Frame 141.svg'
import Frame from '../../assets/icon/lessonIcons/video-square.svg'
import Frame1 from '../../assets/icon/lessonIcons/Слой_x0020_1.svg'
import Button from './Button'

const Lessons = ({
  variant,
  element,
  variantClick,
  variantLessonEditTools,
  chageExplain,
  id,
  getId,
  deleteAssignment,
  addAssignment,
  deleteLesson,
  onEdit,
  onClickStudentSubmission,
}) => {
  const [show, setShow] = useState(false)
  const showStudents = () => {
    setShow((prevState) => !prevState)
  }
  const [showDeletAssignmentButton, setShowDeleteAssignmentButton] =
    useState(false)

  const showAssignments = () => {
    setShowDeleteAssignmentButton(true)
  }
  const hideDeleteAssignmentButton = () => {
    setShowDeleteAssignmentButton(false)
    getId(null)
  }

  return (
    <div>
      <Container variant={variant}>
        <div key={element.id}>
          {variant === 'User' && (
            <Container>
              <div>
                <H1>
                  {element?.count} - {element?.text}
                </H1>
              </div>
              {element?.urlLesson && (
                <StyledTagA href={element?.urlLesson}>
                  <Lesson>
                    <D>
                      <Img src={Frame} alt='error' />
                      <Title>{element?.title}</Title>
                    </D>
                    <Date>{element?.date}</Date>
                  </Lesson>
                </StyledTagA>
              )}
              {element.lessons &&
                element?.lessons?.map((elem) => {
                  return (
                    <StyledTagA href={elem?.youtube}>
                      <Lesson>
                        <D>
                          <Img src={Frame} alt='error' />
                          <Title>{elem?.youtubeTitle}</Title>
                        </D>
                        <Date>{elem?.date}</Date>
                      </Lesson>
                    </StyledTagA>
                  )
                })}
              {element?.urlPdf && (
                <StyledTagA href={element?.urlPdf}>
                  <Lesson>
                    <D3>
                      <Img src={Frame2} alt='error' />
                      <Title>{element?.explain}</Title>
                    </D3>

                    <Data>{element?.date}</Data>
                  </Lesson>
                </StyledTagA>
              )}
              {element?.assignments &&
                element?.assignments?.map((elem) => {
                  const dateString = elem?.created
                  const [year, month, day] = dateString.split('T')[0].split('-')
                  const formattedDate = `${day}.${month}.${year}`
                  return (
                    <Lesson onClick={() => chageExplain(elem)} key={elem.id}>
                      <D1>
                        <Img src={Frame1} alt='error' />
                        <Title>{elem?.title} </Title>
                      </D1>
                      <Date>{formattedDate}</Date>
                      {elem?.submissionResponseList?.map((item) => {
                        return (
                          <DivScore>
                            {item?.score !== 0 ? (
                              <Score score={item?.score}>
                                {`${item?.score} ball `}
                              </Score>
                            ) : null}
                          </DivScore>
                        )
                      })}
                    </Lesson>
                  )
                })}
            </Container>
          )}
          {variant === 'Mentor' && (
            <MentorLesson
              onAuxClick={() => (variantLessonEditTools ? onEdit(element) : '')}
            >
              <LessonEditTools>
                {variantLessonEditTools && (
                  <ButtonsLessonBlock>
                    <AddAssignmentButton onClick={() => addAssignment(element)}>
                      +
                    </AddAssignmentButton>
                    <DeleteButton>
                      <Button
                        onClick={() => deleteLesson(element)}
                        variant='delete button'
                      />
                    </DeleteButton>
                  </ButtonsLessonBlock>
                )}
                <H1>{element.text}</H1>
              </LessonEditTools>
              <StyledTagA href={element?.youtubeUrl}>
                <Lesson>
                  <D6>
                    <Img src={Frame} alt='error' />
                    <Title>{element?.youtubeTitle}</Title>
                  </D6>
                </Lesson>
              </StyledTagA>
              {element?.lessons &&
                element?.lessons.map((elem) => {
                  return (
                    <StyledTagA href={elem?.youtube}>
                      <Lesson>
                        <D6>
                          <Img src={Frame} alt='error' />
                          <Title>{elem?.youtubeTitle}</Title>
                        </D6>
                      </Lesson>
                    </StyledTagA>
                  )
                })}
              <StyledTagA href={element.urlPdf}>
                <Lesson>
                  <D7>
                    <Img src={Frame3} alt='error' />
                    <Title>{element.titleFile}</Title>
                  </D7>
                </Lesson>
              </StyledTagA>
              {element?.assignments &&
                element?.assignments?.map((el) => {
                  const dateString = el?.created
                  const [year, month, day] = dateString.split('T')[0].split('-')
                  const formattedDate = `${day}.${month}.${year}`
                  return (
                    <Div onMouseLeave={hideDeleteAssignmentButton}>
                      {showDeletAssignmentButton && (
                        <DeleteAssignmentButton>
                          {el.id === id && (
                            <Button
                              onClick={() => deleteAssignment(el)}
                              variant='delete button'
                            />
                          )}
                        </DeleteAssignmentButton>
                      )}
                      <LessonLeft>
                        <D7
                          onMouseOverCapture={() => getId(el.id)}
                          onMouseOver={showAssignments}
                        >
                          <Img src={Frame1} alt='error' />
                          <Title>{el.title}</Title>
                        </D7>
                        <Left>
                          <DateBlock>
                            <Data>{formattedDate}</Data>
                            <DivStudent
                              onClickCapture={() => getId(el.id)}
                              onClick={
                                variantClick === 'disbled' ? '' : showStudents
                              }
                            >
                              <P>
                                {el?.submissionResponseList?.length || 0}{' '}
                                студент жооп берди
                              </P>
                              {el?.submissionResponseList?.map((elem) => {
                                return (
                                  show && (
                                    <ShowedStudents>
                                      <p
                                        onClick={() =>
                                          onClickStudentSubmission({
                                            assimentId: el.id,
                                            submissinonId: elem.id,
                                            student: elem,
                                          })
                                        }
                                        style={{ cursor: 'pointer' }}
                                      >
                                        {el.id === id && elem.studentName}
                                      </p>
                                    </ShowedStudents>
                                  )
                                )
                              })}
                            </DivStudent>
                          </DateBlock>
                        </Left>
                      </LessonLeft>
                    </Div>
                  )
                })}
            </MentorLesson>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Lessons

const Container = styled.div`
  * {
    margin: 0;
  }
  width: 1200px;
  margin-bottom: 35px;
  @media screen and (max-width: 391px) {
    width: 370px;
    display: flex;
    margin-bottom: 20px;
    display: inline-block;
    margin: 0;
  }
`
const D = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 391px) {
    display: flex;
    align-items: center;
  }
`
const D1 = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 391px) {
    display: flex;
    align-items: center;
    margin-bottom: 40x;
  }
`
const D3 = styled.div`
  display: flex;
  align-items: center;
`

const D6 = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 391px) {
    display: flex;
    align-items: center;
  }
`

const D7 = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 391px) {
    display: flex;
    align-items: center;
  }
`

const DivScore = styled.div`
  width: 190px;
  display: flex;
  justify-content: end;
  @media screen and (max-width: 391px) {
    width: auto;
  }
`
const DateBlock = styled.div`
  display: flex;
  align-items: baseline;
`
const DivStudent = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  cursor: pointer;
  @media screen and (max-width: 391px) {
    display: flex;
    justify-content: end;
  }
`

const Lesson = styled.div`
  width: 1077px;
  display: flex;
  align-items: center;
  margin-left: 60px;
  margin-top: 5px;
  &:hover {
    background-color: rgba(116, 194, 215, 0.1);
  }
  @media screen and (max-width: 391px) {
    display: block;
    width: 323px;
    margin: 0;
    margin-left: 47px;
  }
`
const LessonLeft = styled.div`
  width: 1100px;
  display: flex;
  align-items: baseline;
  margin-left: 60px;
  margin-top: 5px;
  &:hover {
    background-color: rgba(116, 194, 215, 0.1);
  }
  @media screen and (max-width: 391px) {
    display: block;
    width: 323px;
    margin: 0;
    margin-left: 47px;
  }
`
const P = styled.p`
  color: #373737;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 23.17px;
  margin-left: 40px;
  display: flex;
  justify-content: end;
`
const Img = styled.img`
  width: 24.04px;
  height: 24px;
  color: rgba(55, 55, 55, 1);
  margin-right: 10px;
  cursor: pointer;
`
const Title = styled.p`
  width: 330px;
  height: 23px;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500px;
  font-size: 16px;
  line-height: 23.17px;
  color: rgba(55, 55, 55, 1);
  margin-right: 400px;
  cursor: pointer;
  @media screen and (max-width: 391px) {
    display: flex;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-weight: 500px;
    font-size: 16px;
    line-height: 23.17px;
    color: rgba(55, 55, 55, 1);
    margin: 0;
    margin-right: 0px;
    margin-top: 8px;
  }
`

const Data = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500px;
  font-size: 16px;
  line-height: 23.17px;
  color: rgba(135, 135, 135, 1);
  margin: 0;
  display: inline-block;
  margin-top: 11px;
`
const Date = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500px;
  font-size: 16px;
  line-height: 23.17px;
  color: rgba(135, 135, 135, 1);
  margin: 0;
  @media screen and (max-width: 391px) {
    margin-top: 7px;
  }
`
const H1 = styled.h6`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 35px;
  @media screen and (max-width: 391px) {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 23.17px;
    color: rgba(55, 55, 55, 1);
    margin-left: 20px;
  }
`
const Score = styled.div`
  width: 94px;
  height: 19px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  line-height: 15.93px;
  margin-right: 2px;
  background-color: ${(props) => props.score === 0 && '#BDBDBD'}${(props) =>
      props.score > 0 && 'rgba(0, 204, 13, 1)'}${(props) =>
      props.score === '' && '#FF8422'};
  @media screen and (max-width: 391px) {
    margin-top: -20px;
    margin-left: 104px;
  }
`
const MentorLesson = styled.div`
  @media screen and (max-width: 391px) {
    margin-top: 20px;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 391px) {
  }
`
const ShowedStudents = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  * {
    margin: 0;
  }
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  @media screen and (max-width: 391px) {
    /* margin-left: 155px; */
  }
`
const Div = styled.div``
const StyledTagA = styled.a`
  text-decoration: none;
`
const LessonEditTools = styled.div`
  display: flex;
  align-items: center;
`
const AddAssignmentButton = styled.button`
  background: rgba(19, 71, 100, 1);
  border-radius: 5px;
  border: none;
  color: white;
  padding: 5px 8px 5px 8px;
  cursor: pointer;
`
const ButtonsLessonBlock = styled.div`
  position: relative;
  top: 10px;
`
const DeleteButton = styled.div`
  position: relative;
  top: 15px;
  height: 12px;
`
const DeleteAssignmentButton = styled.div`
  position: relative;
  top: 8px;
  left: 20px;
  height: 0px;
`
