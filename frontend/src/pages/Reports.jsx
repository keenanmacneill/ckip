import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterPillsGroup from '../components/FilterPillsGroup';
import Header from '../components/Header';
import Report from '../components/Report';
import AppContext from '../context/AppContext';
import handleExportPdf from '../helpers/handleExportPdf';
import '../style/Reports.css';

const PAGE_SIZE = 25;
const SEARCH_DEBOUNCE_MS = 500;
const PRIORITY_OPTIONS = ['attention', 'critical', 'routine'];
const DATE_RANGE_OPTIONS = [
  { value: 'all_dates', label: 'All dates' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_60_days', label: 'Last 60 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
];

export default function Reports() {
  const { categories, cap, selectedReports, setSelectedReports } =
    useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);

  const navigate = useNavigate();

  const sortedCategories = [...(categories || [])].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: 'base' }),
  );

  const handleNewReport = () => {
    navigate('/dashboard');
  };

  const handleExportSelected = () => {
    handleExportPdf(selectedReports);
  };

  const handleClearSelected = () => {
    setSelectedReports([]);
  };

  const handleSelectAll = () => {
    setSelectedReports([...reports]);
  };

  // Initializes URL query params from localStorage, but only if none exist yet
  useEffect(() => {
    // Exit early if URL already has query params (prevents overwriting user state)
    if (searchParams.toString()) return;

    // Load previously saved query string from localStorage
    const savedView = localStorage.getItem('reportsViewState');

    // If no saved state, apply default query params
    if (!savedView) {
      setSearchParams({
        sort_by: 'created_at',
        order: 'desc',
        limit: String(PAGE_SIZE),
        offset: '0',
      });
      return;
    }

    // Convert saved query string into URLSearchParams object
    const parsedSavedView = new URLSearchParams(savedView);

    // Override limit to match current PAGE_SIZE (avoid stale values)
    parsedSavedView.set('limit', String(PAGE_SIZE));

    // Ensure offset exists, otherwise default to first page
    if (!parsedSavedView.has('offset')) {
      parsedSavedView.set('offset', 0);
    }

    // Update URL with restored and normalized query params
    setSearchParams(parsedSavedView);
  }, [searchParams, setSearchParams]); // rerun if URL params or setter changes

  // Converts URL query params into a usable object and memoizes it
  const query = useMemo(() => {
    const params = new URLSearchParams(searchParams); // create a readable params object from current URL

    const selectedCategories = params
      .get('categories') // get "categories" as comma-separated string
      ?.split(',') // split into array
      .filter(Boolean); // remove empty values

    const selectedPriorities = params
      .get('priorities') // get "priorities" as comma-separated string
      ?.split(',') // split into array
      .filter(Boolean); // remove empty values

    return {
      q: params.get('q') || '',
      selectedCategories: selectedCategories || [],
      selectedPriorities: selectedPriorities || [],
      dateRange: params.get('date_range') || 'all_dates',
      sortBy: params.get('sort_by') || 'created_at',
      order: params.get('order') || 'desc',
      limit: params.get('limit') || String(PAGE_SIZE),
      offset: Number(params.get('offset') || 0),
    };
  }, [searchParams]); // recompute only when URL params change

  // normalizes query updates
  const updateQuery = useCallback(
    updates => {
      // Create a mutable copy of current query params
      const next = new URLSearchParams(searchParams);

      // Apply incoming updates (add, update, or remove params)
      Object.entries(updates).forEach(([key, value]) => {
        // Remove param if value is empty, null, undefined, or empty array
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (Array.isArray(value) && !value.length)
        ) {
          next.delete(key);
        } else {
          // Set param value
          // Arrays are converted to comma-separated strings
          next.set(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      });

      // Reset pagination if filters/search change
      // Prevents landing on invalid pages after filtering
      if (
        'q' in updates ||
        'categories' in updates ||
        'priorities' in updates ||
        'date_range' in updates
      ) {
        next.set('offset', '0');
      }

      // Enforce default sorting if missing
      if (!next.get('sort_by')) next.set('sort_by', 'created_at');

      // Enforce default order if missing (fix syntax bug)
      if (!next.get('order')) next.set('order', 'desc');

      // Always enforce page size (prevents user tampering)
      next.set('limit', String(PAGE_SIZE));

      // Ensure offset exists (pagination baseline)
      if (!next.get('offset')) next.set('offset', '0');

      // Commit updated query params to URL + trigger re-render/fetch
      setSearchParams(next);

      // Return updated params (useful for debugging or chaining)
      return next;
    },
    [searchParams, setSearchParams],
  );

  const [searchInput, setSearchInput] = useState(query.q);
  const searchDebounceTimeout = useRef(null);

  const handleSearchChange = e => {
    const nextValue = e.target.value; // get current input value from the event

    setSearchInput(nextValue); // update local state immediately for UI responsiveness

    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current); // clear any existing debounce timer
    }

    searchDebounceTimeout.current = setTimeout(() => {
      if (nextValue != query.q) {
        updateQuery({ q: nextValue }); // update query params only if value actually changed
      }
    }, SEARCH_DEBOUNCE_MS); // delay execution to avoid excessive updates
  };

  useEffect(() => {
    return () => {
      if (searchDebounceTimeout.current) {
        clearTimeout(searchDebounceTimeout.current); // clear pending debounce timer on unmount to prevent memory leaks
      }
    };
  }, []); // run once on mount, cleanup runs on unmount

  useEffect(() => {
    const params = new URLSearchParams(searchParams); // clone current URL query params
    params.set('limit', String(PAGE_SIZE)); // enforce page size
    if (!params.get('offset')) params.set('offset', '0'); // ensure pagination offset exists

    const getReports = async () => {
      setLoading(true); // start loading state

      const res = await fetch(
        `http://localhost:8080/reports?${params.toString()}`, // request with query string
        {
          credentials: 'include', // include cookies (auth/session)
        },
      );

      if (!res.ok) {
        setReports([]); // reset reports on failure
        setTotalReports(0); // reset total count
        setSelectedReports([]); // clear selected reports
        setLoading(false); // stop loading
        return;
      }

      const data = await res.json(); // parse response JSON
      const parsedReports = Array.isArray(data?.data) ? data.data : []; // ensure reports is an array
      const parsedTotal = Number.isFinite(data?.total) ? data.total : 0; // ensure total is a valid number

      setReports(parsedReports); // update reports state
      setTotalReports(parsedTotal); // update total count

      setSelectedReports(current =>
        current.filter(
          selected => parsedReports.some(report => report.id === selected.id), // keep only selected reports that still exist in new data
        ),
      );

      setLoading(false); // stop loading after success
    };

    localStorage.setItem('reportsViewState', params.toString()); // persist current query state
    getReports(); // trigger data fetch
  }, [searchParams, setSelectedReports]); // re-run when query params change

  const handleSort = () => {
    updateQuery({ order: query.order === 'asc' ? 'desc' : 'asc' });
  };

  const pageNumber = Math.floor(query.offset / PAGE_SIZE + 1);
  const totalPages = Math.max(Math.ceil(totalReports / PAGE_SIZE), 1);
  const hasNextPage = query.offset + PAGE_SIZE < totalReports;

  if (!categories) return null;

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div className="page-header-title">All reports</div>
            <div className="page-header-subtitle">
              {loading ? 'Loading reports...' : `${totalReports} total reports`}
            </div>
          </div>

          <div className="page-utility-container">
            <button
              className="page-action-secondary"
              onClick={handleSelectAll}
              disabled={
                selectedReports.length === reports.length || !reports.length
              }
            >
              Select all
            </button>
            <button
              className="page-action-secondary"
              onClick={handleClearSelected}
              disabled={selectedReports.length === 0}
            >
              Clear selected
            </button>
            <button
              className="page-action-secondary"
              onClick={handleExportSelected}
              disabled={selectedReports.length === 0}
            >
              Export selected ({selectedReports.length})
            </button>
            <button className="page-action-primary" onClick={handleNewReport}>
              + New report
            </button>
          </div>
        </div>

        <div className="filters-bar">
          <input
            className="filter-input"
            type="search"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by title, MGRS, or submitter..."
          />

          <FilterPillsGroup
            label="Categories"
            allValue="all_categories"
            allLabel="All categories"
            selectedValues={query.selectedCategories}
            onChange={values => updateQuery({ categories: values })}
            options={sortedCategories.map(category => ({
              value: category.category,
              label: category.category
                .split('_')
                .map(word => cap(word))
                .join(' '),
            }))}
          />
          <div className="reports-bar-bottom">
            <FilterPillsGroup
              label="Priorities"
              allValue="all_priorities"
              allLabel="All priorities"
              selectedValues={query.selectedPriorities}
              onChange={values => updateQuery({ priorities: values })}
              options={PRIORITY_OPTIONS.map(priority => ({
                value: priority,
                label: priority
                  .split('_')
                  .map(word => cap(word))
                  .join(' '),
              }))}
            />

            <div className="reports-date">
              <select
                className="filter-select"
                value={query.dateRange}
                onChange={event =>
                  updateQuery({ date_range: event.target.value })
                }
              >
                {DATE_RANGE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button className="filter-button" onClick={handleSort}>
                Date {query.order === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="reports-table">
          <div className="reports-header">
            <div>EXPORT</div>
            <div>ID</div>
            <div>TITLE</div>
            <div>MGRS</div>
            <div>CATEGORIES</div>
            <div>PRIORITY</div>
            <div>SUBMITTED BY</div>
            <div>DATE</div>
          </div>

          {!loading &&
            reports.map(report => <Report key={report.id} report={report} />)}
        </div>

        <div className="reports-pagination">
          <button
            className="page-action-secondary"
            onClick={() => updateQuery({ offset: 0 })}
            disabled={query.offset === 0}
          >
            First
          </button>

          <button
            className="page-action-secondary"
            onClick={() =>
              updateQuery({ offset: Math.max(query.offset - PAGE_SIZE, 0) })
            }
            disabled={query.offset === 0}
          >
            Previous
          </button>

          <span>
            Page {pageNumber} of {totalPages}
          </span>

          <button
            className="page-action-secondary"
            onClick={() => updateQuery({ offset: query.offset + PAGE_SIZE })}
            disabled={loading || !hasNextPage}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
