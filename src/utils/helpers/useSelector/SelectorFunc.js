import { useSelector } from 'react-redux'

export const SelectorFuncMentorHeader = () => {
  const headerData = useSelector((state) => state.mentorInstructorHeader)
  return headerData
}
export const SelectorFuncMentorBody = () => {
  const bodyData = useSelector((state) => state.mentorInstructorBody)
  return bodyData
}
