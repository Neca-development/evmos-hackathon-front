import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'

import type { IGetUserRequest } from './get-user.dto'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['USER'],
  endpoints: (builder) => ({
    getUser: builder.query<any, IGetUserRequest>({
      query: (args) => {
        return {
          url: `user/get-daos/${args.userAddress}`,
          method: 'GET',
        }
      },
      providesTags: ['USER'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),
  }),
})

export const { useGetUserQuery } = userApi
