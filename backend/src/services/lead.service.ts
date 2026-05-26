import Lead, { ILead } from "../models/lead.model";

interface LeadQuery {
  page?: number;
  status?: string;
  source?: string;
  search?: string;
  sort?: string;
}

export const fetchLeadsService = async (
  queryParams: LeadQuery
) => {
  const page =
    Number(queryParams.page) || 1;

  const limit = 10;

  const skip = (page - 1) * limit;

  const query: Record<
    string,
    unknown
  > = {};

  // Filter by status
  if (queryParams.status) {
    query.status = queryParams.status;
  }

  // Filter by source
  if (queryParams.source) {
    query.source = queryParams.source;
  }

  // Search by name or email
  if (queryParams.search) {
    query.$or = [
      {
        name: {
          $regex:
            queryParams.search,
          $options: "i",
        },
      },
      {
        email: {
          $regex:
            queryParams.search,
          $options: "i",
        },
      },
    ];
  }

  // Sort option
  const sortOption: Record<
    string,
    1 | -1
  > =
    queryParams.sort ===
    "oldest"
      ? { createdAt: 1 }
      : { createdAt: -1 };

  // Fetch leads
  const leads = await Lead.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  // Total count
  const total =
    await Lead.countDocuments(query);

  return {
    leads,
    pagination: {
      total,
      page,
      pages: Math.ceil(
        total / limit
      ),
    },
  };
};

// Create Lead
export const createLeadService = async (
  data: ILead
) => {
  return await Lead.create(data);
};

// Get Lead by ID
export const getLeadByIdService =
  async (id: string) => {
    return await Lead.findById(id);
  };

// Update Lead
export const updateLeadService =
  async (
    id: string,
    data: Partial<ILead>
  ) => {
    return await Lead.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  };

// Delete Lead
export const deleteLeadService =
  async (id: string) => {
    return await Lead.findByIdAndDelete(
      id
    );
  };