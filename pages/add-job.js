import { getSession, useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { onJobFormChange } from '../features/appSlice';
import DefaultLayout from '../layouts/DefaultLayout';
import Wrapper from '../wrappers/DashboardFormPage';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';

const statusValues = ['pending', 'declined', 'interview'];
const jobTypeValues = ['full-time', 'part-time', 'remote', 'intership'];

export default function AddJob() {
  const { data: session } = useSession();
  const { jobForm, editId } = useSelector((state) => state.app);

  const { position, company, job_location, status, job_type } = jobForm;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post('/api/jobs', { ...jobForm, id: session.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <Wrapper>
        <form className='form' onSubmit={onSubmit}>
          <h4>{editId ? 'edit job' : 'profile'}</h4>
          <div className='form-center'>
            <FormRow
              labelText='Position'
              type='text'
              name='position'
              value={position}
              onChange={onJobFormChange}
            />
            <FormRow
              labelText='Company'
              type='text'
              name='company'
              value={company}
              onChange={onJobFormChange}
            />
            <FormRow
              labelText='Job Location'
              type='text'
              name='job_location'
              value={job_location}
              onChange={onJobFormChange}
            />
            <FormRowSelect
              labelText='Status'
              list={statusValues}
              name='status'
              value={status}
              onChange={onJobFormChange}
            />
            <FormRowSelect
              labelText='Job Type'
              list={jobTypeValues}
              name='job_type'
              value={job_type}
              onChange={onJobFormChange}
            />
            <div className='btn-container'>
              <button type='submit' className='btn btn-block submit-btn'>
                submit
              </button>
              <button type='button' className='btn btn-block clear-btn'>
                clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/register',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
