import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/types'

import type {
  IGenerateMintSignature,
  IPostMintRequestListRequest,
  ISuccessMintRequest,
} from './model'

export const mintRequestApi = createApi({
  reducerPath: 'mintRequestApi',
  baseQuery,
  tagTypes: ['MINT_REQUEST'],
  endpoints: (builder) => ({
    postMintRequestList: builder.mutation<void, IPostMintRequestListRequest>({
      query: (args) => {
        return {
          url: `/mint-request/generate-list/${args.daoAddress}`,
          method: 'POST',
          body: { file: args.csv },
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

export const {
  usePostMintRequestListMutation,
  useGenerateMintSignatureMutation,
  useSuccessMintRequestMutation,
} = mintRequestApi
