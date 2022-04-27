import Link from 'next/link';
import { useRouter } from 'next/router';

import links from '../utils/links';

export default function NavLinks() {
  const { pathname } = useRouter();

  return (
    <div className='nav-links'>
      {links.map((link) => (
        <Link href={link.path} passHref key={link.id}>
          <a
            className={`${
              pathname === link.path ? 'nav-link active' : 'nav-link'
            } `}
          >
            <span className='icon'>{link.icon}</span>
            {link.text}
          </a>
        </Link>
      ))}
    </div>
  );
}
