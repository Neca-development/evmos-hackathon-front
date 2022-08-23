import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import type {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { logout, refreshToken } from '@store/auth/auth.slice'
import { Mutex } from 'async-mutex'

import { baseQuery } from './base.query'

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs | never, api: BaseQueryApi, extraOptions: {}) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    console.log(result.error.data)

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          { url: 'auth/users/refresh-tokens', mode: 'cors' },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          api.dispatch(refreshToken(refreshResult.data as { token: string }))

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
          window.location.href = '/login'
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
