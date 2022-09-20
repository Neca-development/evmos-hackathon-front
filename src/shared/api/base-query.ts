import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: `https://cos-dao.win/api/`,
  mode: 'cors',
})
