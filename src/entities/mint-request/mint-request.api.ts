import { createApi } from '@reduxjs/toolkit/dist/query'
import { baseQuery } from '@shared/api'

export const mintRequestApi = createApi({
  reducerPath: 'mintRequestApi',
  baseQuery,
  tagTypes: ['MINT_REQUEST'],
  endpoints: (builder) => ({
    postMintRequestList: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),

    generateMintSignature: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),

    deleteMintRequest: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['MINT_REQUEST'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),
  }),
})
