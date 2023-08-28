import React from 'react'
import { styled } from 'styled-components'

const HomeWorkTask = ({
  variant,
  Tasks,
  OnswerHomeWork,
  taskN1,
  setTaskN1,
}) => {
  const handlerTaskN1 = (i) => {
    if (taskN1 === i) {
      return setTaskN1(null)
    }
    return setTaskN1(i)
  }
  return (
    <Container>
      {Tasks.map((element, i) => (
        <div key={element.id}>
          <StyledDivN1>
            <StyledTaskTitle onClick={() => handlerTaskN1(i)}>
              {element.taskTitle}
            </StyledTaskTitle>
          </StyledDivN1>
          {taskN1 === i && element.img && (
            <StyledDivN2>
              <StyledTaskImg src={element.img} alt='' />
            </StyledDivN2>
          )}
          {taskN1 === i && element.kods && (
            <StyledDivN3>{element.kods}</StyledDivN3>
          )}
          {taskN1 === i && element.text && (
            <StyledDivN4>
              <Styledtextp>{element.text}</Styledtextp>
            </StyledDivN4>
          )}
        </div>
      ))}
      {variant === 'admin' && (
        <ContainerDiv>
          {!OnswerHomeWork && (
            <div>
              <H5>Ожидание ответа...</H5>
            </div>
          )}
          {OnswerHomeWork &&
            OnswerHomeWork.map((element) => (
              <div key={element.id}>
                <StyledDivN1>
                  <div>
                    <H5>Ответ</H5>
                  </div>
                  {element.taskTitle && (
                    <StyledTaskTitle>{element.taskTitle}</StyledTaskTitle>
                  )}
                </StyledDivN1>
                {element.img && (
                  <StyledDivN2>
                    <StyledTaskImg src={element.img} alt='' />
                  </StyledDivN2>
                )}
                {element.kods && (
                  <StyledDivN3>
                    <Styledtextp>{element.kods}</Styledtextp>
                  </StyledDivN3>
                )}
                {element.text && (
                  <StyledDivN4>
                    <Styledtextp>{element.text}</Styledtextp>
                  </StyledDivN4>
                )}
              </div>
            ))}
        </ContainerDiv>
      )}
    </Container>
  )
}

export default HomeWorkTask

const Container = styled.div`
  width: 100%;
  @media (max-width: 391px) {
    /* margin-left: 90px; */
    width: 100%;
  }
  @media screen and (max-width: 391px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
const ContainerDiv = styled.div`
  margin-top: 76px;
  text-align: start;
`
const StyledDivN1 = styled.div`
  width: 400px;
  height: 23px;
  color: rgba(55, 55, 55, 1);
  margin-top: 35px;
  @media screen and (max-width: 391px) {
    width: 350px;
    height: auto;
  }
`
const H5 = styled.h5`
  font-family: Zen Kaku Gothic New;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(19, 71, 100, 1);
  margin-bottom: 14px;
`
const StyledTaskTitle = styled.p`
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`
const StyledDivN2 = styled.div`
  width: 507px;
  height: 380px;
  flex-shrink: 0;
  margin-top: 41px;
  margin-bottom: 27px;
  @media screen and (max-width: 391px) {
    width: 300px;
    height: auto;
  }
`
const StyledTaskImg = styled.img`
  width: 507px;
  height: 380px;
  flex-shrink: 0;
  @media (max-width: 391px) {
    width: 300px;
    height: auto;
    background-color: blue;
  }
`
const StyledDivN3 = styled.div`
  width: 258px;
  height: 23px;
  color: rgba(55, 55, 55, 1);
  margin-top: 47px;
  margin-bottom: 100px;
  @media screen and (max-width: 391px) {
    width: 300px;
    height: auto;
    margin-bottom: 0;
  }
`
const StyledDivN4 = styled.div`
  display: flex;
  width: 701px;
  flex-direction: column;
  flex-shrink: 0;
  color: rgba(55, 55, 55, 1);
  margin-top: 47px;
  @media screen and (max-width: 391px) {
    width: 350px;
    height: auto;
  }
`
const Styledtextp = styled.p`
  font-family: Zen Kaku Gothic New;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
