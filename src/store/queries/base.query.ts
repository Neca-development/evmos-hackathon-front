import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  mode: 'cors',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth?.token
  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set('access-token', `${token}`)
  //     console.log(token)
  //   }
  //   return headers
  // },
})
