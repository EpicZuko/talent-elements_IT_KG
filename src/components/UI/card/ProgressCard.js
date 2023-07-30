import styled from 'styled-components'

const ProgressCard = (props) => {
  return (
    <ProgressBlock>
      <Span>
        {(props.percent / 100) * 10 === 100 ? (
          <SpanSuccess>Завершено</SpanSuccess>
        ) : (
          <SpanActive>{(props.percent / 100) * 10}%</SpanActive>
        )}
      </Span>
      <Progress percent={props.percent} />
    </ProgressBlock>
  )
}
export default ProgressCard

const Progress = styled.div`
  width: ${(props) => (props.percent / 100) * 10}%;
  max-width: 112px;
  height: 20px;
  flex-shrink: 0;
  color: var(--white, #fff);
  font-size: 11px;
  font-family: Zen Kaku Gothic New;
  font-weight: 500;
  border-radius: 4px;
  background: var(--green, #00cc0d);
`
const ProgressBlock = styled.div`
  width: 112px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #bdbdbd;
  margin-bottom: 8px;
`
const Span = styled.span`
  position: absolute;
`
const SpanSuccess = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  margin-left: 29px;
  color: var(--white, #fff);
  font-size: 11px;
  font-family: Zen Kaku Gothic New;
  font-weight: 500;
`
const SpanActive = styled.span`
  margin-top: 1px;
  display: flex;
  margin-left: 49px;
  align-items: center;
  justify-content: center;
  color: var(--white, #fff);
  font-size: 11px;
  font-family: Zen Kaku Gothic New;
  font-weight: 500;
`
