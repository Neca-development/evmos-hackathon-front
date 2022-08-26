import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: `http://135.181.216.90:49263/api/`,
  mode: 'cors',
})
