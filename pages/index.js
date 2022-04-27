import HeadOfPage from '../components/HeadOfPage';
import Navbar from '../components/Navbar';
import SmallSidebar from '../components/SmallSidebar';

export default function Home() {
  return (
    <HeadOfPage title='Jobify'>
      <SmallSidebar />
      <Navbar />
    </HeadOfPage>
  );
}
