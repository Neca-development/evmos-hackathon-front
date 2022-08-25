import { createApi } from '@reduxjs/toolkit/dist/query'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type {
  IGenerateMintSignature,
  IGetAllUserMintRequests,
  IGetAllUserMintRequestsDto,
  IPostMintRequest,
  ISuccessMintRequest,
} from './model'

export const mintRequestApi = createApi({
  reducerPath: 'mintRequestApi',
  baseQuery,
  tagTypes: ['MINT_REQUEST'],
  endpoints: (builder) => ({
    getAllUserMintRequests: builder.query<
      IGetAllUserMintRequestsDto,
      IGetAllUserMintRequests
    >({
      query: (args) => {
        return {
          url: `/mint-request/generate-list/${args.userAddress}`,
          method: 'GET',
        }
      },
      providesTags: ['MINT_REQUEST'],
      transformResponse: (res: IBaseResponse<IGetAllUserMintRequestsDto>) => {
        return res.data
      },
    }),

    postMintRequestList: builder.mutation<void, IPostMintRequest>({
      query: (args) => {
        return {
          url: `/mint-request/generate-list/${args.daoAddress}`,
          method: 'POST',
          body: { file: args.csvFile },
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
    }),

    generateMintSignature: builder.mutation<string, IGenerateMintSignature>({
      query: (args) => {
        return {
          url: `/mint-request/generate-signature/${args.mintRequestId}`,
          method: 'POST',
          body: { mintRequestId: args.mintRequestId },
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
