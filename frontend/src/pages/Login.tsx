import { useState } from 'react';

import { useForm } from 'react-hook-form';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import API from '../api/axios';

import { useAuthStore } from '../store/authStore';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const [loginError, setLoginError] =
    useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (
    data: LoginFormInputs
  ) => {
    try {
      setLoginError('');

      const response = await API.post(
        '/auth/login',
        data
      );

      setAuth(
        response.data.token,
        response.data.role
      );

      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      setLoginError(
        'Invalid email or password'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          {...register('email', {
            required: 'Email is required',
          })}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          {...register('password', {
            required:
              'Password is required',
          })}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password.message}
          </p>
        )}

        {loginError && (
          <p className="text-red-500 text-sm mb-3">
            {loginError}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;