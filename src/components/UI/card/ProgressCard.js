/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ProgressCard = (props) => {
  const { date_start, date_finish, date_count } = props
  const startDate = new Date(date_start)
  const finishDate = date_finish ? new Date(date_finish) : null
  const countDate = new Date(date_count)

  const [progress, setProgress] = useState(calculateProgress())

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function calculateProgress() {
    const currentDate = new Date()
    let timeDiff

    if (finishDate) {
      timeDiff = finishDate - startDate
    } else {
      timeDiff = countDate - startDate
    }

    const remainingTime = Math.max(timeDiff - (currentDate - startDate), 0)
    const progressPercentage = Math.min(
      (1 - remainingTime / timeDiff) * 100,
      100
    )

    return progressPercentage
  }

  return (
    <ProgressBlock>
      <Span>
        {progress >= 100 ? (
          <SpanSuccess>Аяктады</SpanSuccess>
        ) : (
          <SpanActive>{progress.toFixed(2)}%</SpanActive>
        )}
      </Span>
      <Progress percent={progress} isCompleted={progress >= 100} />
    </ProgressBlock>
  )
}

export default ProgressCard

const Progress = styled.div`
  width: ${(props) => props.percent}%;
  max-width: 112px;
  height: 20px;
  flex-shrink: 0;
  color: var(--white, #fff);
  font-size: 11px;
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-weight: 500;
  border-radius: 4px;
  background: ${(props) =>
    props.isCompleted ? 'var(--green, #00cc0d)' : 'var(--gray, #bdbdbd)'};
`

const ProgressBlock = styled.div`
  width: 112px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--gray, #bdbdbd);
  margin-bottom: 8px;
`

const Span = styled.span`
  position: absolute;
`

const SpanSuccess = styled.span`
  margin-left: 33px;
  color: var(--white, #fff);
  font-size: 11px;
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
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
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-weight: 500;
`
