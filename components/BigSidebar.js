import Image from 'next/image';

import Wrapper from '../wrappers/BigSidebar';
import NavLinks from './NavLinks';

export default function BigSidebar() {
  return (
    <Wrapper>
      <div className='sidebar-container show-sidebar'>
        <div className='content'>
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
