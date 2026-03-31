import { useContext } from 'react';
import ReportsFilters from '../components/reports/ReportsFilters';
import ReportsPagination from '../components/reports/ReportsPagination';
import ReportsTable from '../components/reports/ReportsTable';
import ReportsToolbar from '../components/reports/ReportsToolbar';
import Header from '../components/shared/Header';
import AppContext from '../context/AppContext';
import useReportsData from '../hooks/useReportsData';
import useReportsQuery from '../hooks/useReportsQuery';
import '../style/Reports.css';

export default function Reports() {
  const { categories } = useContext(AppContext);

  const {
    query,
    updateQuery,
    searchParams,
    categoryOptions,
    priorityOptions,
    dateRangeOptions,
    PAGE_SIZE,
  } = useReportsQuery();

  const { reports, loading, totalReports } = useReportsData(searchParams);

  const pageNumber = Math.floor(query.offset / PAGE_SIZE + 1);
  const totalPages = Math.max(Math.ceil(totalReports / PAGE_SIZE), 1);
  const hasNextPage = query.offset + PAGE_SIZE < totalReports;

  if (!categories) return null;

  return (
    <>
      <Header />

      <main className="page">
        <ReportsToolbar
          reports={reports}
          loading={loading}
          totalReports={totalReports}
        />

        <ReportsFilters
          query={query}
          updateQuery={updateQuery}
          categoryOptions={categoryOptions}
          priorityOptions={priorityOptions}
          dateRangeOptions={dateRangeOptions}
        />

        <ReportsTable reports={reports} loading={loading} />

        <ReportsPagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          loading={loading}
          offset={query.offset}
          pageSize={PAGE_SIZE}
          onPageChange={offset => updateQuery({ offset })}
        />
      </main>
    </>
  );
}
