import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSession, useSession, signIn } from 'next-auth/react';
import axios from 'axios';

import { setAlert } from '../features/appSlice';
import DefaultLayout from '../layouts/DefaultLayout';
import Wrapper from '../wrappers/DashboardFormPage';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';

export default function Profile() {
  const { data: session } = useSession();
  const { alert } = useSelector((state) => state.app);
  const [formValue, setFormValue] = useState({
    name: session?.user?.name ? session.user.name : '',
    last_name: session?.last_name ? session.last_name : '',
    email: session?.user?.email ? session.user.email : '',
    location: session?.location ? session?.location : '',
  });
  const dispatch = useDispatch();

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
      dispatch(setAlert({ type: 'danger', text: 'All fields are required' }));
      return;
    }

    signIn('update', {
      email,
      callbackUrl: '/profile',
    });
    dispatch(setAlert({ type: 'success', text: 'User updated' }));
  };

  return (
    <DefaultLayout>
      <Wrapper>
        <form className='form' onSubmit={onSubmit}>
          <h3>profile</h3>
          {alert.show && <Alert />}
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
