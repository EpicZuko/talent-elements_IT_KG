import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import AurtorozationLogoAdptiv from '../../assets/icon/autorizationIcons/autorizationBgAdaptiv.svg'
import ABgE from '../../assets/icon/autorizationIcons/autorizationBgELems.svg'
import ItKgLogo from '../../assets/icon/autorizationIcons/itKgLogo.svg'
import AutorizationLogo from '../../assets/icon/autorizationIcons/nubelson-fernandes-UcYBL5V0xWQ-unsplash 1.svg'
import {
  postLoginOrRegister,
  LoginSliceAction,
  putVerificateUser,
  getForgetPassword,
  putCheckCodeForRestorePassword,
  putNewPassword,
} from '../../services/reducerSlice/authSlice/loginOrRegisterSlice'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Modall from '../UI/Modal'
import CustomizedSnackbars from '../UI/Snackbar'

const Autorization = ({ variant, onClickVariant }) => {
  const [createAccount, setCreateAccount] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [toComeIn, setToComeIn] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  })
  const loginHandler = () => {
    onClickVariant()
  }
  const regHandler = () => {
    onClickVariant()
  }
  const dispatch = useDispatch()
  const {
    status,
    Isuccess,
    vfn,
    restoreVfn,
    restoreStatus,
    restoreIsSuccess,
    codeStatus,
    codeIsSuccess,
    emailStatus,
    emailIsSuccess,
    isVerificated,
  } = useSelector((state) => state.login)
  const createAccountHandlerChangeValue = (event) => {
    setCreateAccount({
      ...createAccount,
      [event.target.name]: event.target.value,
    })
  }
  const toComeInHandlerChangeValue = (event) => {
    setToComeIn({
      ...toComeIn,
      [event.target.name]: event.target.value,
    })
  }
  const closeSnackBarHandler = () => {
    dispatch(
      LoginSliceAction.snackBarClose({
        Isuccess: false,
        status,
        restoreIsSuccess: false,
        restoreStatus,
        codeIsSuccess: false,
        codeStatus,
        emailStatus,
        emailIsSuccess: false,
      })
    )
  }
  const submitLogin = (event) => {
    event.preventDefault()
    dispatch(
      postLoginOrRegister({
        body: {
          emailOrUsername: createAccount.emailOrUsername,
          password: createAccount.password,
        },
        fetchRole: 'login',
      })
    )
  }

  const submitAuth = (event) => {
    event.preventDefault()
    dispatch(
      postLoginOrRegister({
        body: {
          username: toComeIn.username,
          fullName: toComeIn.fullName,
          email: toComeIn.email,
          password: toComeIn.password,
        },
        fetchRole: 'register',
      })
    )
  }
  const [verificationCode, setVerifcationCode] = useState('')
  const verificationCodeHandler = (event) => {
    setVerifcationCode(event.target.value)
  }
  const checkCode = (event) => {
    event.preventDefault()
    if (verificationCode.length >= 6) {
      dispatch(
        putVerificateUser({
          email: toComeIn.email,
          code: verificationCode,
          username: toComeIn.username,
          password: toComeIn.password,
        })
      )
      setVerifcationCode('')
      if (isVerificated) {
        setToComeIn({
          email: '',
          code: '',
          fullName: '',
          username: '',
          password: '',
        })
      }
    }
  }

  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }

  const [restoreInputs, setRestoreInputs] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    code: '',
  })
  const getEmailForRestore = (event) => {
    setRestoreInputs({
      email: event.target.value,
      password: restoreInputs.password,
      repeatPassword: restoreInputs.repeatPassword,
    })
  }
  const getPasswordForRestore = (event) => {
    setRestoreInputs({
      email: restoreInputs.email,
      password: event.target.value,
      repeatPassword: restoreInputs.repeatPassword,
      code: restoreInputs.code,
    })
  }
  const getRepeatPasswordForRestore = (event) => {
    setRestoreInputs({
      email: restoreInputs.email,
      password: restoreInputs.password,
      repeatPassword: event.target.value,
      code: restoreInputs.code,
    })
  }
  const getCodeForRestore = (event) => {
    setRestoreInputs({
      email: restoreInputs.email,
      password: restoreInputs.password,
      repeatPassword: restoreInputs.repeatPassword,
      code: event.target.value,
    })
  }
  const getRestoreRequest = () => {
    if (restoreInputs.email.trim() !== '') {
      dispatch(getForgetPassword({ email: restoreInputs.email }))
    }
  }
  const checkCodeForRestorePassword = () => {
    if (restoreInputs.email !== '' && restoreInputs.code !== '') {
      dispatch(
        putCheckCodeForRestorePassword({
          code: restoreInputs.code,
          email: restoreInputs.email,
        })
      )
    }
  }
  const restorePassword = () => {
    if (
      restoreInputs.password.trim() !== '' &&
      restoreInputs.repeatPassword.trim() !== '' &&
      restoreInputs.password === restoreInputs.repeatPassword
    ) {
      dispatch(putNewPassword(restoreInputs))
      setRestoreInputs({
        email: restoreInputs.email,
        password: '',
        repeatPassword: '',
      })
    }
    if (restoreStatus === 'success') {
      closeModal()
    }
  }
  const backToEmailCheckCode = () => {
    dispatch(LoginSliceAction.emailCheckBack())
  }
  return (
    <>
      <CustomizedSnackbars
        message={
          status === 'success'
            ? 'Куттуктайбыз! Сиз системага ийгиликтүү катталыңыз! Кош келипсиз 😊'
            : 'Кечиресиз катталууда ката кетти! Сураныч маалыматты тууралап кайрадан жөнөтүңүз! 😔(почтаңыз "com" болуусу жана сыр сөздө чоң тамга, белги жана сан болуусу зарыл)'
        }
        variant={status}
        open={Isuccess}
        closeSnackbar={closeSnackBarHandler}
      />
      <CustomizedSnackbars
        message={
          restoreStatus === 'success'
            ? 'Куттуктайбыз! Сиз сыр сөзүңүздү ийгиликтүү өзгөрттүңүз! Кайрадан кош келипсиз 😊'
            : 'Кечиресиз ката кетти! Сураныч маалыматты тууралап кайрадан жөнөтүңүз! 😔(cыр сөздө чоң тамга, белги жана сан болуусу зарыл)'
        }
        variant={restoreStatus}
        open={restoreIsSuccess}
        closeSnackbar={closeSnackBarHandler}
      />
      <CustomizedSnackbars
        message={
          codeStatus === 'success'
            ? 'Куттуктайбыз! Кодту туура тердиниз!'
            : 'Кечиресиз ката кетти! 😔(код 6дан коп болуусу жана сан турдо болуусу зарыл) Же туура эмес жазылды'
        }
        variant={codeStatus}
        open={codeIsSuccess}
        closeSnackbar={closeSnackBarHandler}
      />
      <CustomizedSnackbars
        message={
          emailStatus === 'error' &&
          'Кечиресиз ката кетти! Азыркы жазган email жок Же туура эмес жазылды'
        }
        variant={emailStatus}
        open={emailIsSuccess}
        closeSnackbar={closeSnackBarHandler}
      />
      <RegisterBg>
        <RegisterBg2>
          <AutorizationFormBlock>
            <AutorizationImgBlock>
              <ItKgLogos>
                <ItKgImg src={ItKgLogo} alt='none' />
                <ItKgText>IT.KG</ItKgText>
              </ItKgLogos>
              <AutorizationImg src={AutorizationLogo} alt='none' />
            </AutorizationImgBlock>
            <div>
              {variant === 'Login' ? (
                <LoginText>
                  <AutorizationText>Кирүү</AutorizationText>
                </LoginText>
              ) : (
                <AutorizationText>Каттоо</AutorizationText>
              )}
              {variant === 'Login' ? (
                <AutorizationForm onSubmit={submitLogin}>
                  <Input
                    placeholder='Логин жазыңыз'
                    type='text'
                    name='emailOrUsername'
                    value={createAccount.emailOrUsername}
                    onChange={createAccountHandlerChangeValue}
                  />
                  <Input
                    placeholder='Сыр сөзүңүздү жазыңыз'
                    type='password'
                    name='password'
                    value={createAccount.password}
                    onChange={createAccountHandlerChangeValue}
                  />
                  <LoginButton>
                    <Button variant='sing in'>Кирүү</Button>
                  </LoginButton>
                  <ForLoginText>
                    Аккаунтуңуз жокбу?
                    <ForLoginText2 onClick={regHandler}>
                      Катталыңыз
                    </ForLoginText2>
                  </ForLoginText>
                  <RestoreText onClick={openModal}>
                    Сыр созунузду унутуп калдынызбы?
                  </RestoreText>
                </AutorizationForm>
              ) : (
                <AutorizationForm
                  onSubmit={vfn === null ? submitAuth : checkCode}
                >
                  <Input
                    placeholder='логин жазыңыз'
                    type='text'
                    name='username'
                    value={toComeIn.username}
                    onChange={toComeInHandlerChangeValue}
                  />
                  <Input
                    placeholder='фамилияңызды жазыңыз'
                    type='text'
                    name='fullName'
                    value={toComeIn.fullName}
                    onChange={toComeInHandlerChangeValue}
                  />
                  <Input
                    placeholder='email жазыңыз'
                    type='email'
                    name='email'
                    value={toComeIn.email}
                    onChange={toComeInHandlerChangeValue}
                  />
                  <Input
                    placeholder='Сыр сөз жазыңыз'
                    type='password'
                    name='password'
                    value={toComeIn.password}
                    onChange={toComeInHandlerChangeValue}
                  />
                  {vfn === false && (
                    <Input
                      placeholder='Текшерүү кодун жазыңыз'
                      type='pasword'
                      name='verificationCode'
                      maxLength={6}
                      value={verificationCode}
                      onChange={verificationCodeHandler}
                    />
                  )}
                  <Button variant='sing in'>
                    {vfn === null ? 'Аккаунт түзүү' : 'Жонотуу'}
                  </Button>
                  <ForLoginText>
                    Сиздин аккаунтуңуз барбы?
                    <ForLoginText2 onClick={loginHandler}>Кирүү</ForLoginText2>
                  </ForLoginText>
                </AutorizationForm>
              )}
            </div>
          </AutorizationFormBlock>
        </RegisterBg2>
      </RegisterBg>
      {modal && (
        <Modall onClose={closeModal}>
          <RestoreTitle>Сыр сөздү калыбына келтирүү</RestoreTitle>
          <RestoreBlock>
            {restoreVfn === null && (
              <Input
                onChange={getEmailForRestore}
                value={restoreInputs.email}
                placeholder='emailды жазыныз'
              />
            )}
            {restoreVfn && (
              <Input
                onChange={getCodeForRestore}
                value={restoreInputs.code}
                placeholder='почтанызга келген кодту жазыныз'
                maxLength={6}
              />
            )}
            {restoreVfn === false && (
              <InputsDiv>
                <Input
                  onChange={getPasswordForRestore}
                  value={restoreInputs.password}
                  placeholder='Жаны сыр соз жазыныз'
                />
                <Input
                  onChange={getRepeatPasswordForRestore}
                  value={restoreInputs.repeatPassword}
                  placeholder='Сыр созунунзду кайталаныз'
                />
              </InputsDiv>
            )}
            <Button
              onClick={
                (restoreVfn === null && getRestoreRequest) ||
                (restoreVfn && checkCodeForRestorePassword) ||
                (restoreVfn === false && restorePassword)
              }
              variant='create group-page'
            >
              Жонотуу
            </Button>
          </RestoreBlock>
          {restoreVfn && (
            <P onClick={backToEmailCheckCode}>
              email туура эмес жазып алдынызбы?
            </P>
          )}
        </Modall>
      )}
    </>
  )
}

export default Autorization
const RegisterBg = styled.div`
  margin: 0;
  position: fixed;
  background: linear-gradient(
    63.43deg,
    #134764 0%,
    #74c2d7 49.81%,
    #02334e 99.63%
  );
  background-size: 100%;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  * {
    transition: 1s;
  }
`
const RegisterBg2 = styled.div`
  margin: 0;
  position: fixed;
  background-image: url(${ABgE});
  background-size: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 415px) {
    background-image: url(${AurtorozationLogoAdptiv});
  }
  @media screen and (max-width: 391px) {
    background-image: url(${AurtorozationLogoAdptiv});
  }
  @media screen and (max-width: 375px) {
    background-image: url(${AurtorozationLogoAdptiv});
  }
`
const AutorizationFormBlock = styled.div`
  display: flex;
  border-radius: 20px;
  background: white;
  border-radius: 20px;
  height: 618px;
  gap: 115px;
  margin-top: 50px;
  padding-right: 105px;
  background-repeat: no-repeat;
  @media screen and (max-width: 415px) {
    width: 344px;
    height: 581px;
    border-radius: 10px;
    padding: 0px 24px 0px 24px;
    justify-content: center;
    margin-top: 120px;
  }
  @media screen and (max-width: 391px) {
    width: 325px;
    height: 581px;
    border-radius: 10px;
    padding: 0px 24px 0px 24px;
    justify-content: center;
  }
  @media screen and (max-width: 376px) {
    width: 290px;
    height: 581px;
    border-radius: 10px;
    padding: 0px 24px 0px 24px;
    justify-content: center;
    margin-top: 65px;
  }
`
const AutorizationImgBlock = styled.div`
  @media screen and (max-width: 415px) {
    display: none;
  }
`
const AutorizationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-top: 30px;
  }
  button {
    margin-top: 60px;
    margin-bottom: 34px;
  }
  @media screen and (max-width: 415px) {
    button {
      margin-top: 24px;
      margin-bottom: 14px;
    }
    input {
      margin-top: 25px;
    }
  }
`
const AutorizationImg = styled.img`
  width: 523px;
  height: 620px;
  border-radius: 20px 0px 0px 20px;
`
const AutorizationText = styled.h4`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 46px;
  letter-spacing: 0em;
  color: #134764;
  margin-top: 90px;
  margin-left: 6px;
  @media screen and (max-width: 415px) {
    margin-top: 60px;
  }
`
const ForLoginText = styled.span`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
  cursor: pointer;
  margin-left: 4px;
`
const ItKgLogos = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  margin-top: 489px;
  margin-left: 145px;
`
const ItKgImg = styled.img`
  width: 79px;
  height: 64px;
`
const ItKgText = styled.span`
  font-family: 'Kaushan Script', cursive;
  font-size: 60px;
  font-weight: 400;
  line-height: 87px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 28px;
  color: white;
`
const ForLoginText2 = styled.span`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #0b3852;
  cursor: pointer;
  margin-left: 4px;
`
const LoginText = styled.div`
  margin-top: 160px;
  margin-bottom: 30px;
  @media screen and (max-width: 415px) {
    margin-top: 96px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 391px) {
    margin-top: 96px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 376px) {
    margin-top: 96px;
    margin-bottom: 36px;
  }
`
const LoginButton = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  @media screen and (max-width: 415px) {
    margin-bottom: 33px;
  }
`
const RestoreText = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #373737;
  cursor: pointer;
  margin-top: 5px;
`
const RestoreTitle = styled.p`
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #373737;
  cursor: pointer;
  margin-top: 60px;
`
const RestoreBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 50px;
`
const P = styled.p`
  text-align: center;
  font-size: 15px;
  margin-top: 20px;
  color: #373737;
  cursor: pointer;
`
const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
