import { getSession, useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { onJobFormChange, resetJobForm, setAlert } from '../features/appSlice';
import DefaultLayout from '../layouts/DefaultLayout';
import Wrapper from '../wrappers/DashboardFormPage';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import Alert from '../components/Alert';

const statusValues = ['pending', 'declined', 'interview'];
const jobTypeValues = ['full-time', 'part-time', 'remote', 'intership'];

export default function AddJob() {
  const { data: session } = useSession();
  const { jobForm, editId, alert } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { position, company, job_location, status, job_type } = jobForm;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!position || !company || !job_location || !status || !job_type) {
      dispatch(setAlert({ type: 'danger', text: 'All fields are required' }));
      return;
    }

    if (!editId) {
      try {
        const { data } = await axios.post('/api/jobs', {
          ...jobForm,
          id: session.id,
        });
        dispatch(resetJobForm());
        dispatch(setAlert({ type: 'success', text: data.message }));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('passed');
      try {
        const { data } = await axios.patch(
          `/api/jobs/${editId}?userId=${session?.id}`,
          {
            ...jobForm,
          }
        );
        dispatch(setAlert({ type: 'success', text: data.message }));
        dispatch(resetJobForm());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange = (e) => {
    dispatch(onJobFormChange({ name: e.target.name, value: e.target.value }));
  };

  return (
    <DefaultLayout>
      <Wrapper>
        <form className='form' onSubmit={onSubmit}>
          <h3>{editId ? 'edit job' : 'profile'}</h3>
          {alert.show && <Alert />}
          <div className='form-center'>
            <FormRow
              labelText='Position'
              type='text'
              name='position'
              value={position}
              onChange={onChange}
            />
            <FormRow
              labelText='Company'
              type='text'
              name='company'
              value={company}
              onChange={onChange}
            />
            <FormRow
              labelText='Job Location'
              type='text'
              name='job_location'
              value={job_location}
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
              labelText='Job Type'
              list={jobTypeValues}
              name='job_type'
              value={job_type}
              onChange={onChange}
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
