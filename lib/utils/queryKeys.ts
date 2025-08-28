export const QUERY_KEYS = {
  RUCHERS: {
    all: ["ruchers"] as const,
    lists: () => [...QUERY_KEYS.RUCHERS.all, "list"] as const,
    list: (filters: string) => [...QUERY_KEYS.RUCHERS.lists(), { filters }] as const,
    details: () => [...QUERY_KEYS.RUCHERS.all, "detail"] as const,
    detail: (id: number) => [...QUERY_KEYS.RUCHERS.details(), id] as const,
  },
};
