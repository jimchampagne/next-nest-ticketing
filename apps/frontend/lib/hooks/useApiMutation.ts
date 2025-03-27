import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetcher } from '../utils/fetcher'
import { UnauthorizedError } from '../utils/error'
import { redirect } from 'next/navigation'

export const useApiMutation = <T>(
  endpoint: string,
  invalidateKeys: string[] = [],
  options?: RequestInit,
) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<T, Error, unknown>({
    mutationFn: (data) =>
      apiFetcher(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        ...options,
      }),
    onSuccess: () => {
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      )
    },
    retry: (failureCount, error) => {
      if (error instanceof UnauthorizedError) {
        return false
      }
      return failureCount < 3
    },
  })

  if (mutation.error instanceof UnauthorizedError) {
    redirect('/login')
  } else {
    return mutation
  }
}
