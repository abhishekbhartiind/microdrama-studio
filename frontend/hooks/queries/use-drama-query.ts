import { useQuery } from '@tanstack/react-query';
import { dramasApi } from '@/lib/api/dramas';
import { dramaKeys } from './drama-keys';

export function useDramaQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: dramaKeys.detail(id),
    queryFn: ({ signal }) => dramasApi.get(id, signal),
    enabled: enabled && Boolean(id),
  });
}
