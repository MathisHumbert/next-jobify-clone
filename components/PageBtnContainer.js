import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../wrappers/PageBtnContainer';

export default function PageBtnContainer({ numberOfPages, setPage, page }) {
  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index;
  });

  return (
    <Wrapper>
      <button
        className='prev-btn'
        onClick={() => setPage(page === 0 ? numberOfPages - 1 : page - 1)}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className='btn-container'>
        {pages.map((item) => (
          <button
            type='button'
            className={`${item === page ? 'pageBtn active' : 'pageBtn'}`}
            key={item}
            onClick={() => setPage(item)}
          >
            {item + 1}
          </button>
        ))}
      </div>
      <button
        className='next-btn'
        onClick={() => setPage(page === numberOfPages - 1 ? 1 : page + 1)}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}
