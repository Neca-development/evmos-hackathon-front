import { createApi } from '@reduxjs/toolkit/dist/query'
import { baseQuery } from '@shared/api'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['USER'],
  endpoints: (builder) => ({
    getAllUserDaos: builder.query<any, any>({
      query: () => {
        return {
          url: '',
          method: 'GET',
        }
      },
      providesTags: ['USER'],
      transformResponse: (res: any) => {
        return res.data
      },
    }),
  }),
})
