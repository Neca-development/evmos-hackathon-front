import { createApi } from '@reduxjs/toolkit/dist/query'
import { baseQuery } from '@shared/api'

export const daoApi = createApi({
  reducerPath: 'daoApi',
  baseQuery,
  tagTypes: ['DAO'],
  endpoints: (builder) => ({
    generateDaoInfoLink: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '',
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
          url: '',
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
