import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: `http://cos-dao.win/api/`,
  mode: 'cors',
})
