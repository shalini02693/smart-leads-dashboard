import { createObjectCsvWriter } from 'csv-writer';

interface LeadCSV {
  name: string;
  email: string;
  status: string;
  source: string;
}

export const exportLeadsCSV = async (
  leads: LeadCSV[]
) => {
  const csvWriter =
    createObjectCsvWriter({
      path: 'leads.csv',

      header: [
        {
          id: 'name',
          title: 'Name',
        },

        {
          id: 'email',
          title: 'Email',
        },

        {
          id: 'status',
          title: 'Status',
        },

        {
          id: 'source',
          title: 'Source',
        },
      ],
    });

  await csvWriter.writeRecords(leads);
};