import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onSearchFormChange, resetSearchForm } from '../features/appSlice';

import Wrapper from '../wrappers/SearchContainer';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const statusValues = ['all', 'pending', 'declined', 'interview'];
const jobTypeValues = ['all', 'full-time', 'part-time', 'remote', 'intership'];
const sortValues = ['latest', 'oldest', 'a-z', 'z-a'];

export default function SearchContainer() {
  const { searchForm } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { position, status, type, sort } = searchForm;

  const onChange = (e) => {
    dispatch(
      onSearchFormChange({ name: e.target.name, value: e.target.value })
    );
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow
            labelText='Search'
            type='text'
            name='position'
            value={position}
            onChange={onChange}
          />
          <FormRowSelect
            labelText='Status'
            list={statusValues}
            name='status'
            value={status}
            onChange={onChange}
          />
          <FormRowSelect
            labelText='Type'
            list={jobTypeValues}
            name='type'
            value={type}
            onChange={onChange}
          />
          <FormRowSelect
            labelText='Sort'
            list={sortValues}
            name='sort'
            value={sort}
            onChange={onChange}
          />
          <button
            className='btn btn-block btn-danger'
            type='button'
            onClick={() => dispatch(resetSearchForm())}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
