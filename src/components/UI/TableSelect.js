import { styled } from 'styled-components'

const Table = ({ student, variant }) => {
  return (
    <Div>
      {variant !== 'table' && (
        <table>
          <TrHead>
            <TableHead>№</TableHead>
            <TableHead>Уроки</TableHead>
            <TableHead>Группы</TableHead>
          </TrHead>
          {student.map((element) => (
            <TrBody>
              <TableBody>{element.number}</TableBody>
              <TableBody>{element.lessons}</TableBody>
              <TableBody width='100px'>{element.groups}</TableBody>
            </TrBody>
          ))}
        </table>
      )}
      {variant === 'table' &&
        student.map((el) => (
          <StyledTable>
            <tr style={{ display: 'flex', gap: '5px' }}>
              <TableBody2>Группа:</TableBody2>
              <TableHead2>{el.groups}</TableHead2>
            </tr>
            <tr style={{ display: 'flex', gap: '5px' }}>
              <TableBody2>Дата регистрации:</TableBody2>
              <TableHead2>{el.date}</TableHead2>
            </tr>
          </StyledTable>
        ))}
    </Div>
  )
}
export default Table

const Div = styled.div`
  @media (max-width: 391px) {
    width: 100%;
    overflow-x: scroll;
  }
`

const TrHead = styled.tr`
  width: 400px;
  display: flex;
  justify-content: space-between;
`
const TrBody = styled.tr`
  width: 450px;
  display: flex;
  justify-content: space-between;
`
const TableHead = styled.th`
  color: var(--black, #373737);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const TableHead2 = styled.th`
  color: #000;
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const TableBody = styled.td`
  color: var(--breadcrumbs, #878787);
  font-family:
    Zen Kaku Gothic New,
    sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 2px;
`
const TableBody2 = styled.td`
  color: var(--breadcrumbs, #878787);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Zen Kaku Gothic New;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 40px;
`
const StyledTable = styled.table`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
