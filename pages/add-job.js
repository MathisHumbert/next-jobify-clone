import { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';

import DefaultLayout from '../layouts/DefaultLayout';
import Wrapper from '../wrappers/DashboardFormPage';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';

export default function AddJob() {
  const { data: session } = useSession();
  const [formValue, setFormValue] = useState({
    position: '',
    company: '',
    job_location: session?.location ? session?.location : '',
    status: 'pending',
    job_type: 'full-time',
  });
  const { position, company, job_location, status, job_type } = formValue;

  const statusValues = ['pending', 'declined', 'interview'];
  const jobTypeValues = ['full-time', 'part-time', 'remote', 'intership'];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

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
            <button type='submit' className='btn btn-block'>
              save changes
            </button>
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
