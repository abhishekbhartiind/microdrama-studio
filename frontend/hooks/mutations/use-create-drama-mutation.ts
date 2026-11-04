import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dramasApi } from '@/lib/api/dramas';
import type { Drama } from '@/lib/types';
import { dramaKeys } from '../queries/drama-keys';

export function useCreateDramaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (drama: Drama) => dramasApi.create(drama),
    onSuccess: async (created) => {
      queryClient.setQueryData(dramaKeys.detail(created.id), created);
      await queryClient.invalidateQueries({ queryKey: dramaKeys.lists() });
    },
  });
}
