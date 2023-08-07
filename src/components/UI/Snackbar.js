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
}) {
  return (
    <Snackbar
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={closeSnackbar}
      autoHideDuration={6000}
    >
      <div>
        <Alert
          sx={{
            height: variant === 'success' ? '' : '85px',
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
          severity={variant}
          icon
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap:
                  (variant === 'success' && '160px') ||
                  (variant === 'error' && '310px') ||
                  (variant === 'info' && '315px') ||
                  (variant === 'warning' && '290px'),
              }}
            >
              <SnackBarText1>
                {(variant === 'success' &&
                  'Спасибо что сообщили нам об этом') ||
                  (variant === 'error' && 'Error Message') ||
                  (variant === 'info' && 'Info Message') ||
                  (variant === 'warning' && 'Warning Message')}
              </SnackBarText1>
              <img onClick={closeSnackbar} src={closeAlertIcon} alt='none' />
            </div>
          </SnackTopBlock>
          <SnackBarText2>{text}</SnackBarText2>
        </Alert>
      </div>
    </Snackbar>
  )
}

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