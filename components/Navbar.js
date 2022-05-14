import { useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';

import Wrapper from '../wrappers/Navbar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setShowSmallSidebar, setShowBigSidebar, showBigSidebar } =
    useAppContext();
  const { data: session } = useSession();

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          type='button'
          className='toggle-btn'
          onClick={() => {
            setShowSmallSidebar(true);
            setShowBigSidebar(!showBigSidebar);
          }}
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
            {session?.user?.name || 'User'}
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
