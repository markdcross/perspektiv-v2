import { useLocation } from 'react-router-dom';

export function useQuery() {
  return useLocation().search;
}
