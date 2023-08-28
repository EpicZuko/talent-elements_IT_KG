import * as React from 'react'
import { Slide, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import styled from 'styled-components'
import successIcon from '../../assets/icon/snackbarIcons/CheckCircle.svg'
import closeAlertIcon from '../../assets/icon/snackbarIcons/close.alert.icon.svg'
import errorIcon from '../../assets/icon/snackbarIcons/errorIcon.svg'
import warningIcon from '../../assets/icon/snackbarIcons/Icon (1).svg'
import infoIcon from '../../assets/icon/snackbarIcons/Icon.svg'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
function TransitionLeft(props) {
  return <Slide {...props} direction='left' />
}

export default function CustomizedSnackbars({
  text,
  variant,
  open,
  closeSnackbar,
  message,
}) {
  return (
    <DivSnackbar>
      <Snackbar
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={closeSnackbar}
        autoHideDuration={4000}
      >
        <div>
          <Alert
            icon
            sx={{
              height: variant === 'success' ? '' : '95px',
              width: '500px',
              paddingTop: '13px',
              color:
                (variant === 'error' && '#FF0000') ||
                (variant === 'info' && '#33BBFD') ||
                (variant === 'warning' && '#FF8800') ||
                'black',
              background:
                (variant === 'success' &&
                  'linear-gradient(0deg, #EAFBE7, #EAFBE7)') ||
                (variant === 'error' && '#FFEBEB') ||
                (variant === 'info' && '#E7EFFF') ||
                (variant === 'warning' && '#FFF3D8'),
              border: '1px solid',
              borderColor:
                (variant === 'success' && '#16FF00') ||
                (variant === 'error' && '#FF0000') ||
                (variant === 'info' && '#33BBFD') ||
                (variant === 'warning' && '#ED9E44'),
              boxShadow: '0px 2px 15px 0px #2121341A',
              borderRadius: '7px',
            }}
            severity={variant !== '' ? variant : ''}
          >
            <SnackTopBlock>
              <img
                src={
                  (variant === 'success' && successIcon) ||
                  (variant === 'info' && infoIcon) ||
                  (variant === 'error' && errorIcon) ||
                  (variant === 'warning' && warningIcon)
                }
                alt='none'
              />
              <SnackbarDiv>
                <SnackBarText1>{message}</SnackBarText1>
                <img onClick={closeSnackbar} src={closeAlertIcon} alt='none' />
              </SnackbarDiv>
            </SnackTopBlock>
            <SnackBarText2>{text}</SnackBarText2>
          </Alert>
        </div>
      </Snackbar>
    </DivSnackbar>
  )
}
const DivSnackbar = styled.div`
  @media (max-width: 391px) {
    .css-yrx55x-MuiPaper-root-MuiAlert-root {
      width: 100% !important;
    }
    .css-1czlyqi-MuiPaper-root-MuiAlert-root {
      width: 100% !important;
    }
  }
`
const SnackBarText1 = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
`
const SnackBarText2 = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #000000;
  margin-top: 5px;
  margin-left: 33px;
`
const SnackTopBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const SnackbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  @media (max-width: 415px) {
    width: 300px;
  }
`
