import { useForm } from 'react-hook-form';

import API from '../../api/axios';

import { useThemeStore } from '../../store/themeStore';

interface LeadFormInputs {
  name: string;
  email: string;
  status: string;
  source: string;
}

interface LeadFormProps {
  onLeadCreated: () => void;
}

const LeadForm = ({
  onLeadCreated,
}: LeadFormProps) => {
  const { darkMode } = useThemeStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormInputs>();

  const onSubmit = async (
    data: LeadFormInputs
  ) => {
    try {
      await API.post('/leads', data);

      onLeadCreated();

      reset();

      alert('Lead Created Successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        darkMode
          ? 'bg-gray-900 p-6 rounded-lg shadow-md'
          : 'bg-white p-6 rounded-lg shadow-md'
      }
    >
      <h2 className="text-xl font-bold mb-4">
        Create Lead
      </h2>

      <input
        type="text"
        placeholder="Name"
        className={
          darkMode
            ? 'w-full border border-gray-700 bg-gray-800 text-white p-2 mb-3 rounded'
            : 'w-full border p-2 mb-3 rounded'
        }
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
        className={
          darkMode
            ? 'w-full border border-gray-700 bg-gray-800 text-white p-2 mb-3 rounded'
            : 'w-full border p-2 mb-3 rounded'
        }
        {...register('email', {
          required: 'Email is required',
        })}
      />

      {errors.email && (
        <p className="text-red-500 text-sm mb-2">
          {errors.email.message}
        </p>
      )}

      <select
        className={
          darkMode
            ? 'w-full border border-gray-700 bg-gray-800 text-white p-2 mb-3 rounded'
            : 'w-full border p-2 mb-3 rounded'
        }
        {...register('status')}
      >
        <option value="New">New</option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">Lost</option>
      </select>

      <select
        className={
          darkMode
            ? 'w-full border border-gray-700 bg-gray-800 text-white p-2 mb-4 rounded'
            : 'w-full border p-2 mb-4 rounded'
        }
        {...register('source')}
      >
        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>
      </select>

      <button
        type="submit"
        className={
          darkMode
            ? 'bg-blue-700 text-white px-4 py-2 rounded'
            : 'bg-blue-600 text-white px-4 py-2 rounded'
        }
      >
        Create Lead
      </button>
    </form>
  );
};

export default LeadForm;