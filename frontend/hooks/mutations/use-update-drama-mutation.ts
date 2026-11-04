import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dramasApi } from '@/lib/api/dramas';
import type { Drama } from '@/lib/types';
import { dramaKeys } from '../queries/drama-keys';

export function useUpdateDramaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (drama: Drama) => dramasApi.update(drama),
    onSuccess: async (updated) => {
      queryClient.setQueryData(dramaKeys.detail(updated.id), updated);
      await queryClient.invalidateQueries({ queryKey: dramaKeys.lists() });
    },
  });
}
