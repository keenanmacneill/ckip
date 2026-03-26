import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  };

  const register = async (email, password) => {
    const res = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res;
  };

  return (
    <AppContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AppContext.Provider>
  );
}
