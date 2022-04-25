import Image from 'next/image';
import Link from 'next/link';

import HeadOfPage from '../components/HeadOfPage';
import Wrapper from '../wrappers/LandingPage';

export default function Landinf() {
  return (
    <HeadOfPage title='Welcome!'>
      <Wrapper>
        <nav>
          <div className='logo'>
            <Image
              src='/logo.svg'
              layout='fixed'
              width='165'
              height='40'
              alt='mainLogo'
            />
          </div>
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link href={'/register'}>
              <a className='btn btn-hero'>Login/Register</a>
            </Link>
          </div>
          <div className='img main-img'>
            <Image
              src='/main.svg'
              width='536'
              height='473'
              layout='fixed'
              alt='mainImg'
              className='img main-img'
            />
          </div>
        </div>
      </Wrapper>
    </HeadOfPage>
  );
}
