import { useContext } from 'react';
import AppContext from './AppContext';

export function useAuth() {
  return useContext(AppContext);
}
