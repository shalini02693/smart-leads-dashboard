import { useThemeStore } from '../../store/themeStore';

interface LeadProps {
  lead: {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
  };

  onDelete?: (id: string) => void;
}

const LeadCard = ({
  lead,
  onDelete,
}: LeadProps) => {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={
        darkMode
          ? 'bg-gray-900 shadow rounded-lg p-4 border border-gray-700'
          : 'bg-white shadow rounded-lg p-4 border'
      }
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">
            {lead.name}
          </h2>

          <p
            className={
              darkMode
                ? 'text-gray-300'
                : 'text-gray-600'
            }
          >
            {lead.email}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium">
            {lead.status}
          </p>

          <p
            className={
              darkMode
                ? 'text-sm text-gray-400'
                : 'text-sm text-gray-500'
            }
          >
            {lead.source}
          </p>
        </div>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(lead._id)}
          className={
            darkMode
              ? 'mt-4 bg-red-700 text-white px-4 py-2 rounded'
              : 'mt-4 bg-red-500 text-white px-4 py-2 rounded'
          }
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default LeadCard;