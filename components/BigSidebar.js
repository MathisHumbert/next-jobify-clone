import Image from 'next/image';

import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/BigSidebar';
import NavLinks from './NavLinks';

export default function BigSidebar() {
  const { showBigSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showBigSidebar
            ? 'sidebar-container show-sidebar'
            : 'sidebar-container'
        }
      >
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
