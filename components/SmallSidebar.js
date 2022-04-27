import { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

import NavLinks from './NavLinks';
import Wrapper from '../wrappers/SmallSidebar';

export default function SmallSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <div
        className={`${
          isOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }`}
      >
        <div className='content'>
          <button className='close-btn' type='button'>
            <FaTimes />
          </button>
          <header>
            <div className='logo'>
              <Image
                priority
                src='/logo.svg'
                layout='fixed'
                width='165'
                height='40'
                alt='mainLogo'
              />
            </div>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}
