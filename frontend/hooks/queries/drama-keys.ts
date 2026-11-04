export const dramaKeys = {
  all: ['dramas'] as const,
  lists: () => [...dramaKeys.all, 'list'] as const,
  list: () => [...dramaKeys.lists(), 'all'] as const,
  details: () => [...dramaKeys.all, 'detail'] as const,
  detail: (id: string) => [...dramaKeys.details(), id] as const,
};
