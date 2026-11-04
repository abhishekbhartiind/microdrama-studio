import { useQuery } from '@tanstack/react-query';
import { dramasApi } from '@/lib/api/dramas';
import { dramaKeys } from './drama-keys';

export function useDramasQuery() {
  return useQuery({
    queryKey: dramaKeys.list(),
    queryFn: ({ signal }) => dramasApi.list({ signal }),
  });
}
