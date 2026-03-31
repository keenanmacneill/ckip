import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { PAGE_SIZE } from './useReportsQuery';

const API_URL = import.meta.env.VITE_API_URL;

export default function useReportsData(searchParams) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);

  const { setSelectedReports } = useContext(AppContext);

  const syncSelectedReports = useCallback(
    parsedReports => {
      setSelectedReports(current =>
        current.filter(selected =>
          parsedReports.some(report => report.id === selected.id),
        ),
      );
    },
    [setSelectedReports],
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!params.get('limit')) params.set('limit', String(PAGE_SIZE));
    if (!params.get('offset')) params.set('offset', '0');
    if (!params.get('sort_by')) params.set('sort_by', 'created_at');
    if (!params.get('order')) params.set('order', 'desc');

    const getReports = async () => {
      setLoading(true);

      const res = await fetch(`${API_URL}/reports?${params.toString()}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        setReports([]);
        setTotalReports(0);
        setSelectedReports([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const parsedReports = Array.isArray(data?.reports) ? data.reports : [];
      const parsedTotal = Number.isFinite(data?.total) ? data.total : 0;

      setReports(parsedReports);
      setTotalReports(parsedTotal);
      syncSelectedReports(parsedReports);
      setLoading(false);
    };

    localStorage.setItem('reportsViewState', params.toString());
    getReports();
  }, [searchParams, setSelectedReports, syncSelectedReports]);

  return { reports, loading, totalReports };
}
