import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type {
  IGenerateMintSignature,
  IGetMintRequestsForUserRequest,
  IGetMintRequestsForUserResponse,
  IPostMintRequestListRequest,
  ISuccessMintRequest,
} from './model'

export const mintRequestApi = createApi({
  reducerPath: 'mintRequestApi',
  baseQuery,
  tagTypes: ['MINT_REQUEST'],
  endpoints: (builder) => ({
    getMintRequestsForUser: builder.query<
      IGetMintRequestsForUserResponse,
      IGetMintRequestsForUserRequest
    >({
      query: (args) => {
        return {
          url: `/mint-request/${args.userAddress}`,
          method: 'GET',
        }
      },
      providesTags: ['MINT_REQUEST'],
      transformResponse: (res: IBaseResponse<IGetMintRequestsForUserResponse>) => {
        return res.data
      },
    }),

    postMintRequestList: builder.mutation<void, IPostMintRequestListRequest>({
      query: (args) => {
        return {
          url: `/mint-request/generate-list/${args.daoAddress}`,
          method: 'POST',
          body: args.csv,
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
    }),

    generateMintSignature: builder.mutation<string, IGenerateMintSignature>({
      query: (args) => {
        return {
          url: `/mint-request/generate-signature/${args.mintRequestId}`,
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
      transformResponse: (res: IBaseResponse<string>) => {
        return res.data
      },
    }),

    successMintRequest: builder.mutation<void, ISuccessMintRequest>({
      query: (args) => {
        return {
          url: `/mint-request/success/${args.mintRequestId}`,
          method: 'POST',
          body: {},
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
    }),
  }),
})

export const {
  useGetMintRequestsForUserQuery,
  usePostMintRequestListMutation,
  useGenerateMintSignatureMutation,
  useSuccessMintRequestMutation,
} = mintRequestApi
