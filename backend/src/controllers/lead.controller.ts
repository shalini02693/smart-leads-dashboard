import { Request, Response } from 'express';

import {
  createLeadService,
  deleteLeadService,
  fetchLeadsService,
  getLeadByIdService,
  updateLeadService,
} from '../services/lead.service';

// Helper to safely extract id
const getId = (id: string | string[]) =>
  Array.isArray(id) ? id[0] : id;

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  const lead = await createLeadService(req.body);

  res.status(201).json({
    success: true,
    data: lead,
  });
};

export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await fetchLeadsService(req.query);

  res.status(200).json({
    success: true,
    data: result.leads,
    pagination: result.pagination,
  });
};

export const getLeadById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = getId(req.params.id);

  const lead = await getLeadByIdService(id);

  if (!lead) {
    res.status(404).json({
      success: false,
      message: 'Lead not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: lead,
  });
};

export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = getId(req.params.id);

  const lead = await updateLeadService(id, req.body);

  res.status(200).json({
    success: true,
    data: lead,
  });
};

export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = getId(req.params.id);

  await deleteLeadService(id);

  res.status(200).json({
    success: true,
    message: 'Lead deleted successfully',
  });
};