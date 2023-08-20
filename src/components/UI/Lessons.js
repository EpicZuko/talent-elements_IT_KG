import styled from 'styled-components'
import Frame3 from '../../assets/icon/lessonIcons/_2759160148944.svg'
import Frame2 from '../../assets/icon/lessonIcons/Frame 141.svg'
import Frame from '../../assets/icon/lessonIcons/video-square.svg'
import Frame1 from '../../assets/icon/lessonIcons/Слой_x0020_1.svg'

const Lessons = ({
  variant,
  element,
  onClickStudent,
  variantClick,
  showStudents,
  show,
  getVotedStudents,
}) => {
  return (
    <div>
      <Container variant={variant}>
        <div key={element.id}>
          {variant === 'User' && (
            <Container>
              <div>
                <H1>{element.text}</H1>
              </div>
              <Lesson>
                <D>
                  <Img src={Frame} alt='error' />
                  <Title>{element.title}</Title>
                </D>
                <Date>{element.date}</Date>
              </Lesson>
              {element.text === '3 -  HTML-документ и ег границы' && (
                <Lesson>
                  <D3>
                    <Img src={Frame2} alt='error' />
                    <Title>{element.explain}</Title>
                  </D3>

                  <Data>{element.date}</Data>
                </Lesson>
              )}
              <Lesson>
                <D1>
                  <Img src={Frame1} alt='error' />
                  <Title>{element.lesson}</Title>
                </D1>
                <Date>{element.date}</Date>
                <DivScore>
                  <Score score={element.score}>
                    {element.score > 0
                      ? `${element.score} ball `
                      : `${element.score === '' ? 'ожидание' : element.score}`}
                  </Score>
                </DivScore>
              </Lesson>
            </Container>
          )}
          {variant === 'Mentor' && (
            <MentorLesson>
              <H1>{element.text}</H1>
              <StyledTagA
                style={{ textDecoration: 'none' }}
                href={element.videoUrl}
              >
                <Lesson>
                  <D6>
                    <Img src={Frame} alt='error' />
                    <Title>{element.title}</Title>
                  </D6>
                  <Data>{element.date}</Data>
                </Lesson>
              </StyledTagA>
              <LessonLeft>
                <StyledTagA
                  style={{ textDecoration: 'none' }}
                  href={element.urlFile}
                >
                  <D7>
                    <Img src={Frame3} alt='error' />
                    <Title>{element.lesson}</Title>
                  </D7>
                </StyledTagA>
                <Left>
                  <DateBlock>
                    <Data>{element.date}</Data>
                    <DivStudent>
                      <P
                        onClickCapture={() => {
                          getVotedStudents(element)
                        }}
                        onClick={() => showStudents(element)}
                      >
                        ответили{' '}
                        {element.votedStudents < 5
                          ? `${element.votedStudents} студента`
                          : `${element.votedStudents} студентов`}
                      </P>
                      {show && (
                        <ShowedStudents>
                          {element.students.map((el) => {
                            return (
                              <p
                                onClick={
                                  variantClick === 'disbled'
                                    ? ''
                                    : () => onClickStudent(el)
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                {el.username}
                              </p>
                            )
                          })}
                        </ShowedStudents>
                      )}
                    </DivStudent>
                  </DateBlock>
                </Left>
              </LessonLeft>
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
  @media screen and (max-width: 391px) {
    display: flex;
    justify-content: end;
  }
`

const Lesson = styled.div`
  width: 1077px;
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
const StyledTagA = styled.a`
  text-decoration: none;
`
