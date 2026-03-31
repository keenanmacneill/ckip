export default function ReportsPagination({
  pageNumber,
  totalPages,
  hasNextPage,
  loading,
  offset,
  pageSize,
  onPageChange,
}) {
  return (
    <div className="reports-pagination">
      <button
        className="page-action-secondary"
        onClick={() => onPageChange(0)}
        disabled={offset === 0}
      >
        First
      </button>

      <button
        className="page-action-secondary"
        onClick={() => onPageChange(Math.max(offset - pageSize, 0))}
        disabled={offset === 0}
      >
        Previous
      </button>

      <span>
        Page {pageNumber} of {totalPages.toLocaleString()}
      </span>

      <button
        className="page-action-secondary"
        onClick={() => onPageChange(offset + pageSize)}
        disabled={loading || !hasNextPage}
      >
        Next
      </button>
    </div>
  );
}
