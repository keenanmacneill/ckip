import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppContextProvider({ children }) {
  const cap = word => word.charAt(0).toUpperCase() + word.slice(1);
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reportDetails, setReportDetails] = useState(() => {
    const saved = localStorage.getItem('reportDetails');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('http://localhost:8080/auth/me', { credentials: 'include' })
      .then(async res => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (email, password) => {
    const res = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res;
  };

  const login = async (email, password) => {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const me = await fetch('http://localhost:8080/auth/me', {
        credentials: 'include',
      });
      const data = await me.json();
      setUser(data);
    }

    return res;
  };

  const logout = async () => {
    await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    setCategories([]);
    setReports([]);
    setReportDetails(null);
    setSelectedReports([]);
  };

  useEffect(() => {
    if (loading || !user) return;

    const getCategories = async () => {
      const res = await fetch('http://localhost:8080/categories', {
        credentials: 'include',
      });

      if (!res.ok) {
        setCategories([]);
        return;
      }

      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    };

    getCategories();
  }, [loading, user]);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        reportDetails,
        setReportDetails,
        categories,
        cap,
        selectedReports,
        setSelectedReports,
        reports,
        setReports,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
