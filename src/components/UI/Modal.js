import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Backdrop = ({ onClose }) => {
  return <StyledBackdrop onClick={onClose} />
}
const ModalContent = ({ children, variant }) => {
  return <StyledModalContent variant={variant}>{children}</StyledModalContent>
}
const BackdropRoot = document.getElementById('backdrop')
const ModalRoot = document.getElementById('modal')

const Modall = ({ children, variant, onClose }) => {
  return (
    <div>
      {createPortal(<Backdrop onClose={onClose} />, BackdropRoot)}
      {createPortal(
        <ModalContent variant={variant}>{children}</ModalContent>,
        ModalRoot
      )}
    </div>
  )
}

export default Modall

const ModallGroup = (props) => {
  return props.variant === 'Modall_Group'
    ? 'top:150px; left:0px; width:849px; height:531px;'
    : 'width:428px; height:320px;'
}
const ModallGroupMedia = (props) => {
  return props.variant === 'Modall_Group'
    ? 'top:250px; left:15px; width:363px; height:261px;'
    : ' width: 371px; height: 320px; top: 200px; left: 10px;'
}

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.25);
`
const StyledModalContent = styled.div`
  position: fixed;
  top: 50vh;
  margin-left: 50%;
  transform: ${(props) =>
    props.variant ? 'translate(-50%, 0%)' : 'translate(-50%, -60%)'};
  ${ModallGroup};
  z-index: 30;
  border-radius: 10px;
  background-color: #fff;
  @media screen and (max-width: 415px) {
    ${ModallGroupMedia}
    left: 0;
    transform: translate(-50%, 0%);
  }
`
