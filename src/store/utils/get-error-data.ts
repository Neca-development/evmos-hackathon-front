import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export const getErrorData = (error: FetchBaseQueryError) => {
  return 'error' in error ? error.error : JSON.stringify(error.data)
}
