import useSearchInput from '../../hooks/useSearchInput';
import FilterPillsGroup from '../shared/FilterPillsGroup';

export default function DashboardFilters({
  query,
  updateQuery,
  categoryOptions,
  priorityOptions,
  dateRangeOptions,
}) {
  const { searchInput, handleSearchChange } = useSearchInput(query.q, value =>
    updateQuery({ q: value }),
  );

  const handleSort = () => {
    updateQuery({ order: query.order === 'asc' ? 'desc' : 'asc' });
  };

  return (
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
        options={categoryOptions}
      />

      <div className="dashboard-bar-bottom">
        <FilterPillsGroup
          label="Priorities"
          allValue="all_priorities"
          allLabel="All priorities"
          selectedValues={query.selectedPriorities}
          onChange={values => updateQuery({ priorities: values })}
          options={priorityOptions}
        />

        <div className="dashboard-date">
          <select
            className="filter-select"
            value={query.dateRange}
            onChange={e => updateQuery({ date_range: e.target.value })}
          >
            {dateRangeOptions.map(option => (
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
  );
}
