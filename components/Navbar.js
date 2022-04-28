import { useState } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';

import Wrapper from '../wrappers/Navbar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setShowSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          type='button'
          className='toggle-btn'
          onClick={() => setShowSidebar(true)}
        >
          <FaAlignLeft />
        </button>
        <div>
          <div className='logo'>
            <Image
              src='/logo.svg'
              layout='fixed'
              width='165'
              height='40'
              alt='mainLogo'
            />
          </div>
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaUserCircle />
            Mathis
            <FaCaretDown />
          </button>
          <div className={`${isOpen ? 'dropdown show-dropdown' : 'dropdown'} `}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => signOut()}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
