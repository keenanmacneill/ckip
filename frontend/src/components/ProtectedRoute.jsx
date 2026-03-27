import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AppContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
