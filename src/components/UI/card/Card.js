import styled from 'styled-components'
import IconCardGroup from '../../../assets/icon/Vector (1).svg'
import ImgCardGroup from '../../../assets/icon/Слой_x0020_1.svg'
import Button from '../Button'
import ProgressCard from './ProgressCard'

const Card = (props) => {
  return (
    <div>
      <Container onClick={props.openHandler}>
        {props?.user?.map((element) => (
          <div key={element.id}>
            <Styled variant={props.variant}>
              <div role='button' tabIndex='0'>
                <Img
                  onClick={() =>
                    props.variantClick === 'disbled'
                      ? ''
                      : props.navToCurrentGroup(element)
                  }
                  src={element.img}
                  alt='error img'
                />
              </div>
              <div>
                <Title onClick={() => props.navToCurrentGroup(element)}>
                  <span>{element.title}</span>
                </Title>
              </div>
              <div>
                {props.variant === 'Manager_group' && (
                  <Containerr>
                    <div
                      onClick={props.onClickHandler}
                      role='button'
                      tabIndex='0'
                    >
                      <Icon
                        onClick={() =>
                          props.variantClick === 'disbled'
                            ? ''
                            : props.navToStudents(element)
                        }
                        src={IconCardGroup}
                        alt='error'
                      />
                      <DivDelete variantdelete={props.variantDelete}>
                        <Students
                          onClick={() =>
                            props.variantClick === 'disbled'
                              ? ''
                              : props.navToStudents(element)
                          }
                        >
                          {element.students} студент
                        </Students>
                        {props.variantDelete === 'delete' ? (
                          <DivDeleteButton variantdelete={props.variantDelete}>
                            <Button
                              variant='delete button'
                              onClick={() =>
                                props.varinatClick === 'disbled'
                                  ? ''
                                  : props.onClickDeleteGroup(element)
                              }
                            />
                          </DivDeleteButton>
                        ) : null}
                      </DivDelete>
                    </div>
                  </Containerr>
                )}
              </div>
              {props.variant === 'mentor_instructor' && (
                <Mentor>
                  <Div1
                    onClick={() =>
                      props.variantClick === 'disabled'
                        ? ''
                        : props.onClickHandler(element)
                    }
                    role='button'
                    tabIndex='0'
                  >
                    <ImgCard src={ImgCardGroup} alt='error' />
                    <Lesson>Курстар - {element.lesson || 0}</Lesson>
                  </Div1>
                  <Div2 role='button' tabIndex='0'>
                    <ImgGroup
                      src={IconCardGroup}
                      alt='error'
                      onClick={() =>
                        props.variantClick === 'disabled'
                          ? ''
                          : props.onClickStudents(element)
                      }
                    />
                    <Studentss>Студенттер - {element.students}</Studentss>
                  </Div2>
                </Mentor>
              )}
              {props.variant === 'User_doctrine' && (
                <div>
                  <ProgressCard
                    date_start={element?.date_start}
                    date_finish={element?.date_finish}
                    date_count={element?.date_count}
                  />
                </div>
              )}
            </Styled>
          </div>
        ))}
      </Container>
    </div>
  )
}

export default Card

const CardHeidhts = (props) => {
  return props.variant === 'mentor_instructor' ? '293px' : '253px'
}
const MenegerHeights = (props) => {
  return props.variant === 'Manager_group' ? '276px' : CardHeidhts
}
const Container = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  @media screen and (max-width: 415px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Lesson = styled.div`
  width: 75px;
  height: 17px;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500px;
  font-size: 12px;
  line-height: 17.38px;
  text-align: center;
  color: rgba(55, 55, 55, 1);
`
const Styled = styled.div`
  width: 350px;
  height: ${MenegerHeights};
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`
const Img = styled.img`
  width: 350px;
  height: 183px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: none;
  border-bottom-right-radius: none;
`
const Title = styled.p`
  line-height: 23.17px;
  font-weight: 700;
  font-size: 16px;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  margin: 0;
  padding: 0;
  margin-top: 7px;
  text-align: center;
  span {
    cursor: pointer;
  }
`
const Containerr = styled.div`
  text-align: center;
  padding-bottom: 20px;
  display: flex;
`
const Icon = styled.img`
  width: 28.24px;
  padding-top: 10px;
  cursor: pointer;
`
const Students = styled.div`
  height: 17px;
  font-size: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500px;
  line-height: 17.38px;
  color: rgba(55, 55, 55, 1);

  @media screen and (max-width: 391px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`
const Mentor = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  margin-bottom: 19px;
`
const Studentss = styled.div`
  width: 85px;
  height: 17px;
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-weight: 500px;
  font-size: 12px;
  line-height: 17.38px;
  text-align: center;
  color: rgba(55, 55, 55, 1);
`
const ImgGroup = styled.img`
  width: 28.24px;
  height: 18px;
  cursor: pointer;
`
const ImgCard = styled.img`
  width: 28.24px;
  height: 18px;
  cursor: pointer;
`
const Div1 = styled.div`
  text-align: center;
`
const Div2 = styled.div`
  text-align: center;
`
const DivDelete = styled.div`
  display: ${(props) => (props.variantdelete === 'delete' ? 'flex' : '')};
  margin-left: ${(props) =>
    props.variantdelete === 'delete' ? '100px' : '0px'};
`
const DivDeleteButton = styled.div`
  padding-left: ${(props) =>
    props.variantdelete === 'delete' ? '70px' : '0px'};
`
