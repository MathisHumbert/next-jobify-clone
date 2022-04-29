import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppContext } from '../context/appContext';
import links from '../utils/links';

export default function NavLinks() {
  const { setShowSmallSidebar } = useAppContext();
  const { pathname } = useRouter();

  return (
    <div className='nav-links'>
      {links.map((link) => (
        <Link href={link.path} passHref key={link.id}>
          <a
            className={`${
              pathname === link.path ? 'nav-link active' : 'nav-link'
            } `}
            onClick={() => setShowSmallSidebar(false)}
          >
            <span className='icon'>{link.icon}</span>
            {link.text}
          </a>
        </Link>
      ))}
    </div>
  );
}
