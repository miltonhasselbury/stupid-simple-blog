import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Link from 'next/link'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

export default function Header() {
  const [scrollY, setScrollY] = useState(0)
  function logit() {
    setScrollY(window.pageYOffset)
  }
  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit)
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', logit)
    }
  })

  const header = {
    backgroundColor: '#fff',
    boxShadow: scrollY > 50 ? 'rgba(0, 0, 0, 0.28) 0px 0px 5px 1px' : 'none',
    left: 0,
    position: 'fixed',
    top: 0,
    transform: scrollY > 50 ? 'translate(0, 0)' : 'translate(0, -60px)',
    transition: 'box-shadow .25s ease-in-out, transform .25s ease-in-out',
    width: '100%',
    zIndex: 100
  }

  const linkStyle = {
    color: '#333',
    textDecoration: 'none'
  }
  return (
    <header className='header' style={header}>
      <div className='flexHeader'>
        <div className='flexLeft'>
          <HamburgerMenu />
        </div>
        <div className='flexLogo'>
          <Link href='/'>
            <a style={linkStyle}>Stupid Simple Blog</a>
          </Link>
        </div>
        <div className='flexRight'>
          <Link href='/add-blog-post'>
            <Fab size='small' color='primary'>
              <AddIcon height='24px' width='24px' />
            </Fab>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .flexHeader {
            align-items: center;
            display: flex;
            justify-content: space-between;
            padding: 10px;
          }
          .flexLogo {
            font-size: 1em;
          }

          @media (min-width: 520px) {
            .flexHeader {
              padding: 10px 20px;
            }
            .flexLogo {
              font-size: 1.5em;
            }
          }
        `}
      </style>
    </header>
  )
}
