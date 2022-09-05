import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type { IDaoEntity } from '../model'
import type { IAddUserRequest } from './add-user.dto'
import type { ICreateDaoRequest } from './create-dao.dto'
import type {
  IGenerateDaoLinksRequest,
  IGenerateDaoLinksResponse,
} from './generate-dao-links.dto'
import type { IGetDaoRequest } from './get-dao.dto'
import type {
  IGetInfoFromIpfsRequest,
  IGetInfoFromIpfsResponse,
} from './get-info-from-ipfs.dto'
import type { IUploadNftsRequest, IUploadNftsResponse } from './upload-nfts.dto'

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

    uploadNfts: builder.mutation<IUploadNftsResponse, IUploadNftsRequest>({
      query: (args) => {
        return {
          url: 'dao/upload-nfts',
          method: 'POST',
          body: args.formData,
        }
      },
      invalidatesTags: ['DAO'],
      transformResponse: (res: IBaseResponse<IUploadNftsResponse>) => {
        return res.data
      },
    }),

    generateDaoLinks: builder.mutation<
      IGenerateDaoLinksResponse,
      IGenerateDaoLinksRequest
    >({
      query: (args) => {
        return {
          url: 'dao/generate-link',
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['DAO'],
      transformResponse: (res: IBaseResponse<IGenerateDaoLinksResponse>) => {
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
  useGenerateDaoLinksMutation,
  useUploadNftsMutation,
  useGetInfoFromIpfsQuery,
} = daoApi
