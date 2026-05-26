import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import API from '../api/axios';

import Navbar from '../components/layout/Navbar';

import { useThemeStore } from '../store/themeStore';

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const LeadDetails = () => {
  const { id } = useParams();

  const { darkMode } = useThemeStore();

  const [lead, setLead] =
    useState<Lead | null>(null);

  const fetchLead = async () => {
    try {
      const response = await API.get(
        `/leads/${id}`
      );

      setLead(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  if (!lead) {
    return (
      <div
        className={
          darkMode
            ? 'min-h-screen bg-black text-white p-6'
            : 'min-h-screen bg-gray-100 text-black p-6'
        }
      >
        Loading...
      </div>
    );
  }

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
        <div
          className={
            darkMode
              ? 'bg-gray-900 shadow rounded-lg p-6'
              : 'bg-white shadow rounded-lg p-6'
          }
        >
          <h1 className="text-2xl font-bold mb-4">
            {lead.name}
          </h1>

          <p className="mb-2">
            <strong>Email:</strong>{' '}
            {lead.email}
          </p>

          <p className="mb-2">
            <strong>Status:</strong>{' '}
            {lead.status}
          </p>

          <p>
            <strong>Source:</strong>{' '}
            {lead.source}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;