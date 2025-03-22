import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetcher } from '../utils/fetcher'

export const useApiMutation = <T>(
  endpoint: string,
  invalidateKeys: string[] = [],
  options?: RequestInit,
) => {
  const queryClient = useQueryClient()

  return useMutation<T, Error, unknown>({
    mutationFn: (data) =>
      apiFetcher(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        ...options,
      }),
    onSuccess: () => {
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      )
    },
  })
}
