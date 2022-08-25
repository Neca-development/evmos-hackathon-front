import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type { ICreateDaoRequest } from './model/create-dao.dto'
import type { IGenerateDaoInfoLinkRequest } from './model/generate-dao-info-link.dto'
import type {
  IGetAllDaoUsersDto,
  IGetAllDaoUsersRequest,
} from './model/get-all-dao-users.dto'
import type { IUploadNftsDto } from './model/upload-nfts.dto'

export const daoApi = createApi({
  reducerPath: 'daoApi',
  baseQuery,
  tagTypes: ['DAO'],
  endpoints: (builder) => ({
    getAllDaoUsers: builder.query<IGetAllDaoUsersDto, IGetAllDaoUsersRequest>({
      query: (body) => {
        return {
          url: 'dao/create',
          method: 'GET',
          body,
        }
      },
      providesTags: ['DAO'],
      transformResponse: (res: IBaseResponse<IGetAllDaoUsersDto>) => {
        return res.data
      },
    }),

    createDao: builder.mutation<void, ICreateDaoRequest>({
      query: (body) => {
        return {
          url: 'dao/create',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['DAO'],
    }),

    uploadNfts: builder.mutation<void, IUploadNftsDto>({
      query: (body) => {
        return {
          url: 'dao/upload-nfts',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['DAO'],
    }),

    generateDaoInfoLink: builder.mutation<any, IGenerateDaoInfoLinkRequest>({
      query: (body) => {
        return {
          url: 'dao/generate-link',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['DAO'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),
  }),
})

export const {
  useGetAllDaoUsersQuery,
  useCreateDaoMutation,
  useGenerateDaoInfoLinkMutation,
  useUploadNftsMutation,
} = daoApi
