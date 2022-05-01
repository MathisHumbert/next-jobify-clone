import { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import DefaultLayout from '../layouts/DefaultLayout';
import Wrapper from '../wrappers/DashboardFormPage';
import FormRow from '../components/FormRow';

export default function Profile() {
  const { data: session } = useSession();
  const [formValue, setFormValue] = useState({
    name: session?.user?.name ? session.user.name : '',
    last_name: session?.last_name ? session.last_name : '',
    email: session?.user?.email ? session.user.email : '',
    location: session?.location ? session?.location : '',
  });

  const { name, last_name, email, location } = formValue;

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch('/api/auth/update', {
        ...formValue,
        id: session.id,
      });
    } catch (error) {
      console.log(error);
      return;
    }

    // update user object
  };

  return (
    <DefaultLayout>
      <Wrapper>
        <form className='form' onSubmit={onSubmit}>
          <h4>profile</h4>
          <div className='form-center'>
            <FormRow
              labelText='Name'
              type='text'
              name='name'
              value={name}
              onChange={onChange}
            />
            <FormRow
              labelText='Last Name'
              type='text'
              name='last_name'
              value={last_name}
              onChange={onChange}
            />
            <FormRow
              labelText='Email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <FormRow
              labelText='Location'
              type='text'
              name='location'
              value={location}
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
