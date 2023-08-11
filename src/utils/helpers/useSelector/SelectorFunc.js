import { useSelector } from 'react-redux'

const SelectorFuncMentor = () => {
  const mentorData = useSelector((state) => state.mentorInstructor)
  return mentorData
}
export default SelectorFuncMentor
