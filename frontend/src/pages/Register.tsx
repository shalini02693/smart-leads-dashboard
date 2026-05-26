import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import API from '../api/axios';

interface RegisterInputs {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit = async (
    data: RegisterInputs
  ) => {
    try {
      await API.post('/auth/register', data);

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          {...register('name', {
            required: 'Name is required',
          })}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-2">
            {errors.name.message}
          </p>
        )}

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
            required: 'Password is required',

            minLength: {
              value: 6,
              message:
                'Password must be at least 6 characters',
            },
          })}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password.message}
          </p>
        )}

        <select
          className="w-full border p-2 mb-4 rounded"
          {...register('role')}
        >
          <option value="sales">
            Sales
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;