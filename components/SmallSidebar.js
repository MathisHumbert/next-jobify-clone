import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Wrapper from '../wrappers/SmallSidebar';

export default function SmallSidebar() {
  const { showSidebar, setShowSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={`${
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }`}
      >
        <div className='content'>
          <button
            className='close-btn'
            type='button'
            onClick={() => setShowSidebar(false)}
          >
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
