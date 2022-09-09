import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'
import type { IBaseResponse } from '@shared/lib/types'

import type { IDeleteMintRequestRequest } from './delete-mint-request.dto'
import type { IGenerateMintSignatureRequest } from './generate-mint-signature.dto'
import type {
  IGetMintRequestsForUserRequest,
  IGetMintRequestsForUserResponse,
} from './get-mint-requests-for-user.dto'
import type { IPostMintRequestListRequest } from './post-mint-request.dto'
import type { IPostMintRequestRequest } from './post-mintrequest.dto'

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

    postMintRequest: builder.mutation<void, IPostMintRequestRequest>({
      query: (args) => {
        return {
          url: '/mint-request',
          method: 'POST',
          body: { ...args },
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
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

    generateMintSignature: builder.mutation<string, IGenerateMintSignatureRequest>({
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

    deleteMintRequest: builder.mutation<void, IDeleteMintRequestRequest>({
      query: (args) => {
        return {
          url: `/mint-request/${args.mintRequestId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
    }),
  }),
})

export const {
  useGetMintRequestsForUserQuery,
  usePostMintRequestMutation,
  usePostMintRequestListMutation,
  useGenerateMintSignatureMutation,
  useDeleteMintRequestMutation,
} = mintRequestApi
