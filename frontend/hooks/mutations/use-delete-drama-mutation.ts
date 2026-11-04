import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dramasApi } from '@/lib/api/dramas';
import { dramaKeys } from '../queries/drama-keys';

export function useDeleteDramaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dramasApi.remove(id),
    onSuccess: async (_, id) => {
      queryClient.removeQueries({ queryKey: dramaKeys.detail(id), exact: true });
      await queryClient.invalidateQueries({ queryKey: dramaKeys.lists() });
    },
  });
}
