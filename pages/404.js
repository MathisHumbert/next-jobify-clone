import Wrapper from '../wrappers/ErrorPage';
import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Wrapper className='full-page'>
      <div>
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}>
          <Image
            src='/not-found.svg'
            width='100%'
            height='100%'
            layout='responsive'
            alt='error'
          />
        </div>

        <h3>Ohh! Page Not Found</h3>
        <p>We can&apos;t seem to find the page you&apos;re looking for</p>
        <Link href='/' passHref>
          <a>back home</a>
        </Link>
      </div>
    </Wrapper>
  );
}
