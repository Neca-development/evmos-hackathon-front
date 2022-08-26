import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type { IGetUserRequest } from './get-user.dto'
import type { IUserEntity } from './user.entity'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['USER'],
  endpoints: (builder) => ({
    getUser: builder.query<IUserEntity, IGetUserRequest>({
      query: (args) => {
        return {
          url: `user/${args.userAddress}`,
          method: 'GET',
        }
      },
      providesTags: ['USER'],
      transformResponse: (res: IBaseResponse<IUserEntity>) => {
        return res.data
      },
    }),
  }),
})

export const { useGetUserQuery } = userApi
