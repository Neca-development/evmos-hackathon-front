import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type { ICreateDaoRequest } from './model/create-dao.dto'
import type { IGenerateDaoInfoLinkRequest } from './model/generate-dao-info-link.dto'
import type {
  IGetAllDaoUsersDto,
  IGetAllDaoUsersRequest,
} from './model/get-all-dao-users.dto'
import type { IUploadNftsDto, IUploadNftsRequest } from './model/upload-nfts.dto'

export const daoApi = createApi({
  reducerPath: 'daoApi',
  baseQuery,
  tagTypes: ['DAO'],
  endpoints: (builder) => ({
    getAllDaoUsers: builder.query<IGetAllDaoUsersDto, IGetAllDaoUsersRequest>({
      query: (args) => {
        return {
          url: 'dao/create',
          method: 'GET',
          body: { ...args },
        }
      },
      providesTags: ['DAO'],
      transformResponse: (res: IBaseResponse<IGetAllDaoUsersDto>) => {
        return res.data
      },
    }),

    createDao: builder.mutation<void, ICreateDaoRequest>({
      query: (args) => {
        return {
          url: 'dao/create',
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['DAO'],
    }),

    uploadNfts: builder.mutation<IUploadNftsDto, IUploadNftsRequest>({
      query: (args) => {
        return {
          url: 'dao/upload-nfts',
          method: 'POST',
          body: args.formData,
        }
      },
      invalidatesTags: ['DAO'],
      transformResponse: (res: IBaseResponse<IUploadNftsDto>) => {
        return res.data
      },
    }),

    generateDaoInfoLink: builder.mutation<any, IGenerateDaoInfoLinkRequest>({
      query: (args) => {
        return {
          url: 'dao/generate-link',
          method: 'POST',
          body: { ...args },
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
