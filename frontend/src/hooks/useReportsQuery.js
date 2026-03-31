import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppContext from '../context/AppContext';

export const PAGE_SIZE = 25;

const DATE_RANGE_OPTIONS = [
  { value: 'all_dates', label: 'All dates' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_60_days', label: 'Last 60 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
  { value: 'last_6_months', label: 'Last 6 months' },
  { value: 'last_year', label: 'Last year' },
  { value: 'last_5_years', label: 'Last 5 years' },
];

const PRIORITY_OPTIONS = ['attention', 'critical', 'routine'];

export default function useReportsQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, cap } = useContext(AppContext);

  // Initialize URL params from localStorage if none exist yet
  useEffect(() => {
    const hasRequiredParams =
      searchParams.get('limit') &&
      searchParams.get('offset') &&
      searchParams.get('sort_by') &&
      searchParams.get('order');

    if (hasRequiredParams) return;

    const savedView = localStorage.getItem('reportsViewState');

    if (!savedView) {
      setSearchParams({
        sort_by: 'created_at',
        order: 'desc',
        limit: String(PAGE_SIZE),
        offset: '0',
      });
      return;
    }

    const parsedSavedView = new URLSearchParams(savedView);
    parsedSavedView.set('limit', String(PAGE_SIZE));

    if (!parsedSavedView.has('offset')) {
      parsedSavedView.set('offset', '0');
    }

    setSearchParams(parsedSavedView);
  }, [searchParams, setSearchParams]);

  const query = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    const selectedCategories = params
      .get('categories')
      ?.split(',')
      .filter(Boolean);
    const selectedPriorities = params
      .get('priorities')
      ?.split(',')
      .filter(Boolean);

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
  }, [searchParams]);

  const updateQuery = useCallback(
    updates => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (Array.isArray(value) && !value.length)
        ) {
          next.delete(key);
        } else {
          next.set(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      });

      if (
        'q' in updates ||
        'categories' in updates ||
        'priorities' in updates ||
        'date_range' in updates
      ) {
        next.set('offset', '0');
      }

      if (!next.get('sort_by')) next.set('sort_by', 'created_at');
      if (!next.get('order')) next.set('order', 'desc');
      next.set('limit', String(PAGE_SIZE));
      if (!next.get('offset')) next.set('offset', '0');

      setSearchParams(next);
      return next;
    },
    [searchParams, setSearchParams],
  );

  const sortedCategories = [...(categories || [])].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: 'base' }),
  );

  const categoryOptions = sortedCategories.map(category => ({
    value: category.category,
    label: category.category
      .split('_')
      .map(word => cap(word))
      .join(' '),
  }));

  const priorityOptions = PRIORITY_OPTIONS.map(priority => ({
    value: priority,
    label: priority
      .split('_')
      .map(word => cap(word))
      .join(' '),
  }));

  return {
    query,
    updateQuery,
    searchParams,
    categoryOptions,
    priorityOptions,
    dateRangeOptions: DATE_RANGE_OPTIONS,
    PAGE_SIZE,
  };
}
