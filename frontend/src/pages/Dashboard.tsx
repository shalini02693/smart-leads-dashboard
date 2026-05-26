import { useEffect, useState } from 'react';

import API from '../api/axios';

import { useDebounce } from '../hooks/useDebounce';

import LeadCard from '../components/leads/LeadCard';

import LeadForm from '../components/forms/LeadForm';

import Pagination from '../components/common/Pagination';

import Navbar from '../components/layout/Navbar';

import { useAuthStore } from '../store/authStore';

import { useThemeStore } from '../store/themeStore';

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const Dashboard = () => {
  const { role } = useAuthStore();

  const { darkMode } = useThemeStore();

  const [leads, setLeads] = useState<Lead[]>([]);

  const [search, setSearch] = useState('');

  const [status, setStatus] = useState('');

  const [source, setSource] = useState('');

  const [sort, setSort] =
    useState('latest');

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const debouncedSearch =
    useDebounce(search);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        '/leads',
        {
          params: {
            page,
            search: debouncedSearch,
            status,
            source,
            sort,
          },
        }
      );

      setLeads(response.data.data);

      setTotalPages(
        response.data.pagination.pages
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (
    id: string
  ) => {
    try {
      await API.delete(`/leads/${id}`);

      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const downloadCSV = async () => {
    try {
      const response = await API.get(
        '/export/csv',
        {
          responseType: 'blob',
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement('a');

      link.href = url;

      link.setAttribute(
        'download',
        'leads.csv'
      );

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    debouncedSearch,
    status,
    source,
    sort,
    page,
  ]);

  return (
    <div
      className={
        darkMode
          ? 'min-h-screen bg-black text-white'
          : 'min-h-screen bg-gray-100 text-black'
      }
    >
      <Navbar />

      <div className="p-6">
        {role === 'admin' && (
          <div className="mb-6">
            <LeadForm
              onLeadCreated={fetchLeads}
            />
          </div>
        )}

        <div
          className={
            darkMode
              ? 'bg-gray-900 p-4 rounded-lg shadow mb-6 grid md:grid-cols-4 gap-4'
              : 'bg-white p-4 rounded-lg shadow mb-6 grid md:grid-cols-4 gap-4'
          }
        >
          <input
            type="text"
            placeholder="Search by name/email"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className={
              darkMode
                ? 'border border-gray-700 bg-gray-800 text-white p-2 rounded'
                : 'border p-2 rounded'
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className={
              darkMode
                ? 'border border-gray-700 bg-gray-800 text-white p-2 rounded'
                : 'border p-2 rounded'
            }
          >
            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className={
              darkMode
                ? 'border border-gray-700 bg-gray-800 text-white p-2 rounded'
                : 'border p-2 rounded'
            }
          >
            <option value="">
              All Sources
            </option>

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

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className={
              darkMode
                ? 'border border-gray-700 bg-gray-800 text-white p-2 rounded'
                : 'border p-2 rounded'
            }
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>
          </select>
        </div>

        {loading ? (
          <div>Loading leads...</div>
        ) : leads.length === 0 ? (
          <div
            className={
              darkMode
                ? 'bg-gray-900 p-6 rounded shadow text-center'
                : 'bg-white p-6 rounded shadow text-center'
            }
          >
            No leads found.
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                onDelete={
                  role === 'admin'
                    ? deleteLead
                    : undefined
                }
              />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <button
          onClick={downloadCSV}
          className={
            darkMode
              ? 'bg-green-700 text-white px-4 py-2 rounded mt-[15px]'
              : 'bg-green-600 text-white px-4 py-2 rounded mt-[15px]'
          }
        >
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default Dashboard;