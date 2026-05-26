import { Request, Response } from 'express';
import Lead from '../models/lead.model';

export const exportCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  const leads = await Lead.find();

  const csvRows = [
    ['Name', 'Email', 'Status', 'Source'],
  ];

  leads.forEach((lead) => {
    csvRows.push([
      lead.name,
      lead.email,
      lead.status,
      lead.source,
    ]);
  });

  const csvContent = csvRows
    .map((row) => row.join(','))
    .join('\n');

  res.header('Content-Type', 'text/csv');

  res.attachment('leads.csv');

  res.send(csvContent);
};