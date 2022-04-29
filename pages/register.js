import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import axios from 'axios';

import HeadOfPage from '../components/HeadOfPage';
import FormRow from '../components/FormRow';
import Wrapper from '../wrappers/RegisterPage';

export default function Register() {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formValue;

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if ((!toggleLogin && !name) || !email || !password) {
      // alert
      return;
    }

    if (!toggleLogin) {
      try {
        await axios.post('/api/auth/signup', {
          name,
          email,
          password,
        });
      } catch (error) {
        console.log(error);
      }
    }

    signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  return (
    <HeadOfPage title='Register'>
      <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
          <div className='logo'>
            <Image
              priority
              src='/logo.svg'
              layout='fixed'
              width='165'
              height='40'
              alt='mainLogo'
            />
          </div>
          <h3>{toggleLogin ? 'Login' : 'Register'}</h3>
          {!toggleLogin && (
            <FormRow
              labelText='Name'
              type='text'
              name='name'
              value={name}
              onChange={onChange}
            />
          )}
          <FormRow
            labelText='Email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
          />
          <FormRow
            labelText='Password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
          <button type='submit' className='btn btn-block'>
            submit
          </button>
          <p>
            {toggleLogin ? 'Already a member?' : 'Not a member yet?'}{' '}
            <button
              className='member-btn'
              type='button'
              onClick={() => setToggleLogin(!toggleLogin)}
            >
              {toggleLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </Wrapper>
    </HeadOfPage>
  );
}
