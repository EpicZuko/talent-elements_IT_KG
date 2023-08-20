import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Error = () => {
  return (
    <CartError>
      <section className='page_404'>
        <h1>Error!</h1>
        <img
          src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
          alt='gif'
        />
        <div className='contant_box_404'>
          <h4>
            We are sorry, the page you requested could not be found &#10006;
          </h4>
          <Link
            to='/'
            href='https://instagram.com/abol.codes'
            className='link_404'
          >
            Go to Home
          </Link>
        </div>
      </section>
    </CartError>
  )
}
export default Error
const CartError = styled.div`
  & .page_404 {
    background: #ffff;
    font-family: 'Inter';
    text-align: center;
    & h1 {
      padding: 0px;
      margin: 0px;
      position: absolute;
      left: 48%;
      top: 95px;
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
