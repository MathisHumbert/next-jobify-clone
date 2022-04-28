import Wrapper from '../wrappers/SharedLayout';
import HeadOfPage from '../components/HeadOfPage';
import Navbar from '../components/Navbar';
import SmallSidebar from '../components/SmallSidebar';
import BigSidebar from '../components/BigSidebar';

export default function DefaultLayout({ children }) {
  return (
    <HeadOfPage title='Jobify'>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>{children}</div>
          </div>
        </main>
      </Wrapper>
    </HeadOfPage>
  );
}
