import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type {
  ICreateVotingRequest,
  IGenerateIpfsLinkRequest,
  IGetInfoFromIpfsRequest,
  IGetInfoFromIpfsResponse,
  IGetVotingsRequest,
  IGetVotingsResponse,
} from './model'

export const votingApi = createApi({
  reducerPath: 'votingApi',
  baseQuery,
  tagTypes: ['VOTING'],
  endpoints: (builder) => ({
    getVotings: builder.query<IGetVotingsResponse, IGetVotingsRequest>({
      query: (args) => {
        return {
          url: `voting/${args.daoAddress}`,
          method: 'GET',
        }
      },
      providesTags: ['VOTING'],
      transformResponse: (res: IBaseResponse<IGetVotingsResponse>) => {
        return res.data
      },
    }),

    createVoting: builder.mutation<void, ICreateVotingRequest>({
      query: (args) => {
        return {
          url: 'voting/create',
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['VOTING'],
    }),

    generateIpfsLink: builder.mutation<string, IGenerateIpfsLinkRequest>({
      query: (args) => {
        return {
          url: 'voting/generate-ipfs',
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['VOTING'],
      transformResponse: (res: IBaseResponse<string>) => {
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
      providesTags: ['VOTING'],
    }),
  }),
})

export const {
  useCreateVotingMutation,
  useGenerateIpfsLinkMutation,
  useGetInfoFromIpfsQuery,
  useGetVotingsQuery,
} = votingApi
