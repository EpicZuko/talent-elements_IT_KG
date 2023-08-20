import React, { useRef } from 'react'
import styled from 'styled-components'
import IconGroup from '../../assets/icon/Vector.svg'

const Profile = ({ files, setFiles, setFormat }) => {
  const fileGroup = useRef(null)

  const changeHandlerFile = (event) => {
    const fileGroup = event.target.files[0]
    setFormat(fileGroup)
    if (fileGroup) {
      const url = URL.createObjectURL(fileGroup)
      setFiles(url)
    }
  }
  const handleFileGroup = () => {
    fileGroup.current.click()
  }
  return (
    <div>
      <Container>
        <StyledDiv>
          {!files && (
            <StyledGroupButton
              onClick={handleFileGroup}
              src={IconGroup}
              alt='error'
            />
          )}

          <StyledGroupFile
            ref={fileGroup}
            onChange={changeHandlerFile}
            type='file'
            accept='image/*,.svg,.png,.jpg,.web'
          />
          {files && (
            <StyledGroupImg onClick={handleFileGroup} src={files} alt='error' />
          )}
        </StyledDiv>
      </Container>
    </div>
  )
}

export default Profile

const Container = styled.div`
  width: 100%;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  flex-wrap: wrap;
  @media screen and (max-width: 390px) {
    /* width: 390px; */
    display: flex;
    flex-direction: row;
  }
`

const StyledDiv = styled.div`
  width: 350px;
  height: 183px;
  flex-shrink: 0;
  background-color: #dde0e6;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledGroupButton = styled.img`
  width: 43.2px;
  height: 32.4px;
  cursor: pointer;
`

const StyledGroupFile = styled.input`
  display: none;
`

const StyledGroupImg = styled.img`
  width: 100%;
  height: 183px;
  object-fit: cover;
`
