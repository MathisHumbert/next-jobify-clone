import { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import DefaultLayout from '../layouts/DefaultLayout';
import Wrapper from '../wrappers/DashboardFormPage';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';

const statusValues = ['pending', 'declined', 'interview'];
const jobTypeValues = ['full-time', 'part-time', 'remote', 'intership'];

export default function AddJob() {
  const { data: session } = useSession();
  const defaultFormValue = {
    position: '',
    company: '',
    job_location: session?.location ? session?.location : '',
    status: 'pending',
    job_type: 'full-time',
  };
  const [formValue, setFormValue] = useState(defaultFormValue);
  const { position, company, job_location, status, job_type } = formValue;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);

    try {
      axios.post('/api/jobs', { ...formValue, id: session.id });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  console.log(session);

  return (
    <DefaultLayout>
      <Wrapper>
        <form className='form' onSubmit={onSubmit}>
          <h4>profile</h4>
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
