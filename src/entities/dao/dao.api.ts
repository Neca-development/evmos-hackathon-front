import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type { IDaoEntity } from '.'
import type { IAddUserRequest } from './model/add-user.dto'
import type { ICreateDaoRequest } from './model/create-dao.dto'
import type { IGenerateDaoInfoLinkRequest } from './model/generate-dao-info-link.dto'
import type { IGetDaoRequest } from './model/get-dao.dto'
import type {
  IGetInfoFromIpfsRequest,
  IGetInfoFromIpfsResponse,
} from './model/get-info-from-ipfs.dto'
import type { IUploadNftsDto, IUploadNftsRequest } from './model/upload-nfts.dto'

export const daoApi = createApi({
  reducerPath: 'daoApi',
  baseQuery,
  tagTypes: ['DAO'],
  endpoints: (builder) => ({
    getDao: builder.query<IDaoEntity, IGetDaoRequest>({
      query: (args) => {
        return {
          url: `dao/${args.daoAddress}`,
          method: 'GET',
        }
      },
      providesTags: ['DAO'],
      transformResponse: (res: IBaseResponse<IDaoEntity>) => {
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

    addUser: builder.mutation<void, IAddUserRequest>({
      query: (args) => {
        return {
          url: 'dao/add-user',
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

    getInfoFromIpfs: builder.query<IGetInfoFromIpfsResponse, IGetInfoFromIpfsRequest>({
      query: (args) => {
        return {
          url: `${args.ipfsUrl}`,
          method: 'GET',
        }
      },
      providesTags: ['DAO'],
    }),
  }),
})

export const {
  useGetDaoQuery,
  useCreateDaoMutation,
  useAddUserMutation,
  useGenerateDaoInfoLinkMutation,
  useUploadNftsMutation,
  useGetInfoFromIpfsQuery,
} = daoApi
