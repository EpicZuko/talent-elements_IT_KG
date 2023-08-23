import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Error = (props) => {
  return (
    <CartError variant={props.variant}>
      <section className='page_404'>
        <h1>Токто!!!</h1>
        <img
          src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
          alt='gif'
        />
        <div className='contant_box_404'>
          <h4>Кечиресиз, сиз сураган баракча табылган жок &#10006;</h4>
          <Link
            to='/'
            href='https://instagram.com/abol.codes'
            className='link_404'
          >
            {props.variant === 'page'
              ? 'Мындай баракча жок'
              : 'Кайрадан катталыныз'}
          </Link>
        </div>
      </section>
    </CartError>
  )
}
export default Error
const CartError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.variant === 'page' ? '1240px' : '100%')};
  @media (max-width: 391px) {
    width: 360px;
  }
  & .page_404 {
    background: #ffff;
    font-family: 'Inter';
    text-align: center;
    @media (max-width: 391px) {
      &.page_404 {
        width: 200px;
        height: 200px;
        margin-top: 100px;
        & h1 {
          font-size: 14px;
        }
        & img {
          width: 200px;
        }
        .link_404 {
          width: 140px;
          height: 40px;
          font-size: 10px;
        }
        & h4 {
          margin-top: 20px;
          color: #abaeb6;
          font-size: 12px;
          font-family: 'Inter', sans-serif;
        }
      }
    }
    & h1 {
      padding: 0px;
      margin: 0px;
      font-family: 'Inter';
    }
    & img {
      width: 670px;
      height: auto;
    }
  }
  & .link_404 {
    margin-top: 19px;
    color: #ffff !important;
    padding: 13px 20px;
    background: var(--light-blue, #134764);
    width: 340px;
    height: 40px;
    flex-shrink: 0;
    color: var(--white, #fff);
    text-align: center;
    font-family: Zen Kaku Gothic New;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 30px;
    display: inline-block;
    text-decoration: none;
  }
  & .contant_box_404 {
    margin-top: -50px;
    & h4 {
      color: #abaeb6;
      font-size: large;
      font-family: 'Inter', sans-serif;
    }
  }
`
