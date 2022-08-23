import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../queries/with-reauth.query'
import type { IGetPhotosDto } from './dto/get-photos.dto'
import type { IPhoto } from './photo.model'

// Define a service using a base URL and expected endpoints
export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PHOTOS'],
  endpoints: (builder) => ({
    getPhotos: builder.query<IGetPhotosDto, void>({
      query: () => {
        return {
          url: 'photos',
          method: 'GET',
        }
      },
      providesTags: ['PHOTOS'],
      transformResponse: (res: IGetPhotosDto) => {
        return res
      },
    }),
    getPhoto: builder.query<IPhoto, { id: string }>({
      query: (args: { id: string }) => {
        return {
          url: `photos/${args.id}`,
          method: 'GET',
        }
      },
      transformResponse: (res: IPhoto) => {
        return res
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPhotoQuery, useGetPhotosQuery } = photosApi
