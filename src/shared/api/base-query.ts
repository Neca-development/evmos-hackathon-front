import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import type { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { RootState } from '@shared/store'
import { Mutex } from 'async-mutex'

export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`,
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const aToken = (getState() as RootState).auth?.accessToken

    // If we have a token set in state, let's assume that we should be passing it.
    if (aToken) {
      headers.set('Authorization', `Bearer ${aToken}`)
    }
    return headers
  },
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (
  arguments_: string | FetchArgs | never,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(arguments_, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      // try {
      //   const refreshResult = await baseQuery(
      //     {
      //       url: 'auth/users/refresh-tokens',
      //       method: 'POST',
      //       body: {
      //         refreshToken: (api.getState() as RootState).auth?.refreshToken,
      //       },
      //     },
      //     api,
      //     extraOptions
      //   )

      //   if (refreshResult.data) {
      //     // @ts-ignore
      //     api.dispatch(refreshToken(refreshResult.data))

      //     // retry the initial query
      //     result = await baseQuery(arguments_, api, extraOptions)
      //   } else {
      //     api.dispatch(logout())
      //     // window.location.pathname = '/login'
      //   }
      // } finally {
      //   release()
      // }
      // api.dispatch(logout())
      release()
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(arguments_, api, extraOptions)
    }
  }

  return result
}
