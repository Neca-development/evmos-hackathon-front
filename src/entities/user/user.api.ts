import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type { ICreateUserRequest } from './create-user.dto'
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

    createUser: builder.mutation<void, ICreateUserRequest>({
      query: (args) => {
        return {
          url: 'user/create',
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['USER'],
    }),
  }),
})

export const { useGetUserQuery } = userApi
