import { useThemeStore } from '../../store/themeStore';

interface PaginationProps {
  page: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const { darkMode } = useThemeStore();

  return (
    <div className="flex items-center gap-2 mt-6 mr-4 justify-end">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={
          darkMode
            ? 'px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded disabled:opacity-50'
            : 'px-4 py-2 border rounded disabled:opacity-50'
        }
      >
        Prev
      </button>

      <span
        className={
          darkMode
            ? 'text-white'
            : 'text-black'
        }
      >
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={
          darkMode
            ? 'px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded disabled:opacity-50'
            : 'px-4 py-2 border rounded disabled:opacity-50'
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;