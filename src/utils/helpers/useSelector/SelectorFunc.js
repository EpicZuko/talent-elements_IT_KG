import { useSelector } from 'react-redux'

const SelectorFuncMentor = () => {
  const bodyData = useSelector((state) => state.mentorInstructor)
  return bodyData
}
export default SelectorFuncMentor
