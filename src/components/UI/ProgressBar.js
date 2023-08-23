import styled from 'styled-components'

export const Progress = (props) => {
  return (
    <ProgressBlock>
      <div>
        <P>
          {props.variant === 'successful' && 'Аяктаган'}
          {props.variant === 'inProgress' && 'Прогрессте'}
          {props.variant === 'notStarted' && 'Баштала элек'}
        </P>
        <BarBlock>
          <ProgressBar>
            <Bar variant={props.variant} perc={props.percent} />
          </ProgressBar>
          <H6>{((props.percent / 120) * 100).toFixed()}%</H6>
        </BarBlock>
      </div>
    </ProgressBlock>
  )
}

const ProgressBar = styled.div`
  width: 350px;
  height: 29px;
  border-radius: 20px;
  background: #f3f3f3;
  margin-top: 5px;
  transition: 0.5s;
  @media (max-width: 415px) {
    transition: 0.5s;
    width: 310px;
  }
  @media (max-width: 376px) {
    transition: 0.5s;
    width: 300px;
  }
  @media (max-width: 361px) {
    transition: 0.5s;
    width: 280px;
  }
`
const ProgressBlock = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 415px) {
    transition: 0.5s;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 376px) {
    transition: 0.5s;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 360px) {
    transition: 0.5s;
    display: flex;
    justify-content: center;
  }
  * {
    margin: 0;
  }
`
const H6 = styled.h6`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
`
const BarBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const Bar = styled.div`
  transition: 0.5s;
  width: ${(props) => (props.perc / 120) * 100}%;
  max-width: 100%;
  height: 29px;
  border-radius: 20px;
  background: ${(props) => props.variant === 'successful' && '#00CC0D'}
    ${(props) => props.variant === 'inProgress' && 'orange'}${(props) => props.variant === 'notStarted' && '#33BBFD'};
  @media screen and (width) {
    transition: 0.5s;
  }
`
const P = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  margin-bottom: 5px;
`
