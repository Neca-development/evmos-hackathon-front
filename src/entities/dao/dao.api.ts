import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api'

import type { IUploadNftsDto } from './model/dto/upload-nfts.dto'

export const daoApi = createApi({
  reducerPath: 'daoApi',
  baseQuery,
  tagTypes: ['DAO'],
  endpoints: (builder) => ({
    uploadNfts: builder.mutation<void, IUploadNftsDto>({
      query: (body) => {
        return {
          url: 'dao/upload-nfts',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['DAO'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),

    generateImageLinks: builder.mutation<any, any>({
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

export const {} = daoApi
